"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import styles from "./building-life.module.css";

/*
 * Life inside the BIM building, laid over its picture at the client's call:
 * light runs along the pipes and the floor slabs, rooms light up and go dark
 * again, screens flicker, lifts ride the glass shafts, people walk the roofs
 * and the open floors, and the plant blinks and glows. Everything sits on the
 * desktop picture's own pixels (3128 x 1752); the phone picture is the same
 * render, smaller, so the layer only has to be set where the building sits
 * in it (design.module.css).
 * Only opacity and translate are animated, and nothing is there off screen.
 *
 * The layer does not wait for the site's motion (html[data-motion]): a phone
 * with its animations off, which on Android is often just its battery saver,
 * turns the site's motion off, and the building stood dead on it. At the
 * client's call it keeps this life there too; the picture's own float, like
 * every other large movement, stays off.
 */

const WIDTH = 3128;
const HEIGHT = 1752;

// light runs this many picture pixels a second
const SPEED = 420;
// a pipe's light, tail included, and its glow across the pipe
const LIGHT = 300;
const GLOW = 96;

type Point = readonly [x: number, y: number];

// A pipe's centre line, the way its light runs: one light goes all along it,
// then the pipe rests until the next, every so many seconds. As few pieces
// as will follow it, and the risers dead upright (they lean by a pixel or
// two at most): a piece at an angle clips its light at a cost each frame.
// A cool one is the same light in the glass's blue, for the floor slabs.
type Pipe = {
  points: readonly Point[];
  every: number;
  delay: number;
  cool?: boolean;
};

const pipes: readonly Pipe[] = [
  // the orange riser down the left wing's glass front
  { points: [[1321, 215], [1321, 1440]], every: 6.5, delay: 0 },
  // the yellow pipe that joins it from the left
  { points: [[1110, 797], [1300, 838]], every: 5.5, delay: 1.2 },
  // the yellow riser through the glass rooms
  { points: [[1810, 300], [1810, 880]], every: 7.5, delay: 2.5 },
  // the yellow pipe under the planted room, down and away to the left
  {
    points: [[1922, 1062], [1922, 1156], [1890, 1182], [1730, 1226], [1578, 1198]],
    every: 6,
    delay: 0.6,
  },
  // the line round the foot of the building
  { points: [[1640, 1503], [1826, 1556], [2745, 1170]], every: 8, delay: 3.2 },
  // the orange riser at the right
  { points: [[2745, 880], [2745, 1172]], every: 5, delay: 1.8 },
  // the yellow rail round the tanks, along it and up its post
  { points: [[352, 800], [700, 868], [712, 782]], every: 7, delay: 4.1 },
  // the left wing's slabs: the one under the upper seats, the long one
  // over the ground floor
  { points: [[440, 404], [1020, 464]], every: 9, delay: 2.2, cool: true },
  { points: [[310, 892], [1100, 1034]], every: 7.5, delay: 5.4, cool: true },
];

// A room: its walls, then the ceiling and the floor at either wall (they run
// up to the right in the picture's perspective). Its light is on for a few
// seconds of every so many.
type Room = {
  walls: readonly [number, number];
  ceiling: readonly [number, number];
  floor: readonly [number, number];
  every: number;
  delay: number;
  // a long open floor has a row of them
  lamps?: number;
  // not a lamp but a screen: its cold light, never steady
  screen?: boolean;
};

const rooms: readonly Room[] = [
  // the right wing's grid of rooms
  { walls: [2518, 2635], ceiling: [417, 410], floor: [545, 540], every: 13, delay: 9 },
  { walls: [2398, 2508], ceiling: [607, 594], floor: [712, 700], every: 11, delay: 2 },
  { walls: [2518, 2635], ceiling: [738, 729], floor: [840, 834], every: 17, delay: 14 },
  { walls: [2398, 2508], ceiling: [928, 905], floor: [1012, 1008], every: 14, delay: 5 },
  { walls: [2518, 2635], ceiling: [892, 868], floor: [997, 984], every: 19, delay: 1 },
  { walls: [2642, 2775], ceiling: [565, 556], floor: [682, 683], every: 12, delay: 7 },
  { walls: [2518, 2635], ceiling: [295, 289], floor: [393, 390], every: 16, delay: 12 },
  { walls: [2398, 2508], ceiling: [1084, 1058], floor: [1166, 1148], every: 15, delay: 4 },
  // the corner block's rooms on its left side, and the one over the lab
  { walls: [1420, 1552], ceiling: [322, 322], floor: [536, 540], every: 18, delay: 3 },
  { walls: [1420, 1552], ceiling: [562, 562], floor: [726, 726], every: 14, delay: 10 },
  { walls: [1572, 1740], ceiling: [330, 334], floor: [452, 456], every: 16, delay: 6 },
  // the left wing's open floor over the blue seats
  { walls: [420, 880], ceiling: [436, 468], floor: [552, 596], every: 21, delay: 8, lamps: 3 },
  // screens in the blue rooms: by the yellow riser, under the roof, and
  // the lab's own
  { walls: [1850, 1990], ceiling: [440, 440], floor: [600, 592], every: 17, delay: 2, screen: true },
  { walls: [2060, 2330], ceiling: [300, 300], floor: [420, 410], every: 23, delay: 11, screen: true },
  { walls: [1660, 1790], ceiling: [690, 690], floor: [800, 800], every: 19, delay: 7, screen: true },
];

// The lifts' glass shafts: the left wing's two tubes, roof to ground floor,
// and the glass core at the right end. Each car keeps its own time.
type Shaft = {
  left: number;
  top: number;
  width: number;
  height: number;
  every: number;
  delay: number;
};

const shafts: readonly Shaft[] = [
  { left: 286, top: 60, width: 68, height: 840, every: 18, delay: 0 },
  { left: 211, top: 60, width: 68, height: 840, every: 23, delay: 9 },
  { left: 2852, top: 205, width: 92, height: 595, every: 20, delay: 5 },
];

// Someone on a floor: from one end of their walk to the other, a pause, and
// back, every so many seconds. The point is the middle of the figure, the
// left end first.
type Walker = { from: Point; to: Point; every: number; delay: number };

// the figure with its glow, in picture pixels
const FIGURE = [70, 110] as const;

const walkers: readonly Walker[] = [
  // behind the left wing's roof rail
  { from: [400, 174], to: [1080, 206], every: 34, delay: 3 },
  // along the balcony over the tanks
  { from: [420, 640], to: [980, 733], every: 27, delay: 12 },
  // on the tanks' floor, between them and the camera
  { from: [740, 858], to: [960, 898], every: 16, delay: 6 },
  // behind the right wing's roof rail
  { from: [2000, 238], to: [2650, 220], every: 31, delay: 17 },
  // round the foot of the building, outside
  { from: [1900, 1548], to: [2800, 1166], every: 44, delay: 9 },
];

// The plant's lamps: a beacon blinks, the others breathe. Their middle, and
// how often.
type Lamp = {
  at: Point;
  tone: "red" | "green" | "amber" | "cyan" | "white";
  every: number;
  delay: number;
  beacon?: boolean;
};

// a lamp with its glow, in picture pixels
const LAMP = 76;

const lamps: readonly Lamp[] = [
  // the roof plant
  { at: [1690, 196], tone: "red", every: 2.4, delay: 0, beacon: true },
  { at: [1772, 180], tone: "green", every: 5, delay: 1.3 },
  { at: [1868, 205], tone: "amber", every: 3.6, delay: 2.1 },
  { at: [1940, 188], tone: "red", every: 2.4, delay: 1.2, beacon: true },
  // the tanks
  { at: [478, 752], tone: "green", every: 4.4, delay: 0.4 },
  { at: [612, 772], tone: "green", every: 4.4, delay: 1.9 },
  { at: [742, 792], tone: "green", every: 4.4, delay: 3.1 },
  // the cabinet on the ground floor, the camera over it
  { at: [560, 1150], tone: "cyan", every: 3.2, delay: 0.8 },
  { at: [1004, 942], tone: "white", every: 5.2, delay: 2.6, beacon: true },
  // the basement plant
  { at: [1700, 1420], tone: "green", every: 4.8, delay: 2.2 },
  { at: [1760, 1445], tone: "red", every: 1.8, delay: 0.5, beacon: true },
  { at: [2050, 1380], tone: "amber", every: 3.9, delay: 1.1 },
  { at: [2180, 1330], tone: "green", every: 5.6, delay: 3.4 },
  // the machines at the right, and the one in the right wing's room
  { at: [2760, 1100], tone: "amber", every: 2.9, delay: 0.2, beacon: true },
  { at: [2860, 1060], tone: "green", every: 4.1, delay: 1.7 },
  { at: [2606, 640], tone: "green", every: 3.7, delay: 2.8 },
];

// Machines that run hot: the orange one in the left wing, the red one in the
// corner block. Their middle and their size.
type Glow = {
  at: Point;
  size: readonly [number, number];
  red?: boolean;
  every: number;
  delay: number;
};

const glows: readonly Glow[] = [
  { at: [948, 585], size: [190, 270], every: 7, delay: 0 },
  { at: [2066, 1078], size: [150, 130], red: true, every: 5, delay: 2 },
];

const across = (x: number) => `${+((x / WIDTH) * 100).toFixed(3)}%`;
const down = (y: number) => `${+((y / HEIGHT) * 100).toFixed(3)}%`;

const timing = (every: number, delay: number) =>
  ({ "--every": `${every}s`, "--delay": `${-delay}s` }) as CSSProperties;

function PipeLight({ points, every, delay, cool }: Pipe) {
  const segments = points.slice(1).map((end, index) => {
    const [x, y] = points[index];
    return {
      start: points[index],
      end,
      length: Math.hypot(end[0] - x, end[1] - y),
      angle: Math.atan2(end[1] - y, end[0] - x),
    };
  });
  // how far along the pipe each piece starts
  const starts = segments.map((_, index) =>
    segments.slice(0, index).reduce((sum, { length }) => sum + length, 0),
  );

  // Each straight piece clips the light to itself, and the light crosses
  // them all at the same speed, at the same time, as one light along the
  // whole pipe: it enters a piece as it leaves the one before. It rides a
  // rail as long as its run in a cycle (SPEED * every), set back by how far
  // along the pipe the piece starts, and the rail moves its own length.
  const run = SPEED * every;

  // The clip is the piece's upright box, with room for the glow beside it
  // but none past its ends; only the track inside is turned along it. (A
  // turned box clipping it would cost the compositor a pass each frame.)
  return segments.map(({ start, end, length, angle }, index) => {
    const side = (GLOW / 2) * Math.abs(Math.sin(angle));
    const over = (GLOW / 2) * Math.abs(Math.cos(angle));
    const box = {
      left: Math.min(start[0], end[0]) - side,
      top: Math.min(start[1], end[1]) - over,
      width: Math.abs(end[0] - start[0]) + 2 * side,
      height: Math.abs(end[1] - start[1]) + 2 * over,
    };
    const inBox = (value: number, size: number) =>
      `${+((value / size) * 100).toFixed(3)}%`;

    return (
      <span
        key={index}
        className={styles.pipe}
        style={{
          left: across(box.left),
          top: down(box.top),
          width: across(box.width),
          height: down(box.height),
        }}
      >
        <span
          className={styles.pipeTrack}
          style={{
            left: inBox(start[0] - box.left, box.width),
            top: inBox(start[1] - GLOW / 2 - box.top, box.height),
            width: inBox(length, box.width),
            height: inBox(GLOW, box.height),
            rotate: `${+angle.toFixed(4)}rad`,
          }}
        >
          <span
            className={styles.pipeRail}
            style={{
              left: `${+(((-starts[index] - LIGHT) / length) * 100).toFixed(2)}%`,
              width: `${+((run / length) * 100).toFixed(2)}%`,
              ...timing(every, delay),
            }}
          >
            <span
              className={`${styles.pipeLight} ${cool ? styles.pipeLightCool : ""}`}
              style={{ width: `${+((LIGHT / run) * 100).toFixed(3)}%` }}
            />
          </span>
        </span>
      </span>
    );
  });
}

function RoomLight({ walls, ceiling, floor, every, delay, lamps = 1, screen }: Room) {
  const top = Math.min(...ceiling);
  const bottom = Math.max(...floor);
  const at = (y: number) => `${+(((y - top) / (bottom - top)) * 100).toFixed(2)}%`;

  return (
    <span
      className={screen ? styles.screen : styles.room}
      style={
        {
          left: across(walls[0]),
          top: down(top),
          width: across(walls[1] - walls[0]),
          height: down(bottom - top),
          clipPath: `polygon(0 ${at(ceiling[0])}, 100% ${at(ceiling[1])}, 100% ${at(floor[1])}, 0 ${at(floor[0])})`,
          "--lamps": lamps,
          ...timing(every, delay),
        } as CSSProperties
      }
    />
  );
}

// The walk is a box as wide and as tall as the way from one end to the
// other, with the figure at its far corner: moved by its own size, the box
// carries the figure from the first end to the second. Floors that climb to
// the right take the box's top corner and move it up.
function Walk({ from, to, every, delay }: Walker) {
  const run = to[0] - from[0];
  const rise = to[1] - from[1];
  const climbs = rise < 0;

  return (
    <span
      className={`${styles.walk} ${climbs ? styles.walkUp : ""}`}
      style={{
        left: across(from[0] - run),
        top: down(climbs ? from[1] : from[1] - rise),
        width: across(run),
        height: down(Math.abs(rise)),
        ...timing(every, delay),
      }}
    >
      <span
        className={styles.figure}
        style={{
          width: `${+((FIGURE[0] / run) * 100).toFixed(3)}%`,
          aspectRatio: `${FIGURE[0]} / ${FIGURE[1]}`,
        }}
      />
    </span>
  );
}

const lampTones = {
  red: styles.lampRed,
  green: styles.lampGreen,
  amber: styles.lampAmber,
  cyan: styles.lampCyan,
  white: styles.lampWhite,
} as const;

export default function BuildingLife({ className = "" }: { className?: string }) {
  const layer = useRef<HTMLDivElement>(null);

  // on only while the picture is on screen: off it, the layer's parts are
  // not there to tick (building-life.module.css)
  useEffect(() => {
    const node = layer.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      node.toggleAttribute("data-on", entry.isIntersecting);
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={layer} className={`${styles.life} ${className}`} aria-hidden="true">
      {rooms.map((room, index) => (
        <RoomLight key={index} {...room} />
      ))}
      {glows.map(({ at, size, red, every, delay }, index) => (
        <span
          key={index}
          className={`${styles.glow} ${red ? styles.glowRed : ""}`}
          style={{
            left: across(at[0] - size[0] / 2),
            top: down(at[1] - size[1] / 2),
            width: across(size[0]),
            height: down(size[1]),
            ...timing(every, delay),
          }}
        />
      ))}
      {pipes.map((pipe, index) => (
        <PipeLight key={index} {...pipe} />
      ))}
      {shafts.map(({ left, top, width, height, every, delay }) => (
        <span
          key={left}
          className={styles.shaft}
          style={{
            left: across(left),
            top: down(top),
            width: across(width),
            height: down(height),
            ...timing(every, delay),
          }}
        >
          <span className={styles.lift} />
        </span>
      ))}
      {lamps.map(({ at, tone, every, delay, beacon }, index) => (
        <span
          key={index}
          className={`${styles.lamp} ${lampTones[tone]} ${beacon ? styles.beacon : ""}`}
          style={{
            left: across(at[0] - LAMP / 2),
            top: down(at[1] - LAMP / 2),
            width: across(LAMP),
            ...timing(every, delay),
          }}
        />
      ))}
      {walkers.map((walker, index) => (
        <Walk key={index} {...walker} />
      ))}
    </div>
  );
}

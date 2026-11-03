import type { CSSProperties } from "react";

import styles from "./building-life.module.css";

/*
 * Life inside the BIM building, laid over its picture at the client's call:
 * light runs along the pipes, rooms light up and go dark again, and a lift
 * rides the glass shaft. Everything sits on the desktop picture's own pixels
 * (3128 x 1752); the phone picture is the same render, smaller, so the layer
 * only has to be set where the building sits in it (design.module.css). Only
 * opacity and translate are animated, and nothing shows without the site's
 * motion (html[data-motion]) or off screen: at rest the building is as it was.
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
type Pipe = { points: readonly Point[]; every: number; delay: number };

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
];

// The lifts' glass shafts, the left wing's two tubes, roof to ground floor;
// each car keeps its own time.
const shafts = [
  { left: 286, every: 18, delay: 0 },
  { left: 211, every: 23, delay: 9 },
] as const;
const SHAFT_TOP = 60;
const SHAFT_WIDTH = 68;
const SHAFT_HEIGHT = 840;

const across = (x: number) => `${+((x / WIDTH) * 100).toFixed(3)}%`;
const down = (y: number) => `${+((y / HEIGHT) * 100).toFixed(3)}%`;

function PipeLight({ points, every, delay }: Pipe) {
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
            style={
              {
                left: `${+(((-starts[index] - LIGHT) / length) * 100).toFixed(2)}%`,
                width: `${+((run / length) * 100).toFixed(2)}%`,
                "--every": `${every}s`,
                "--delay": `${-delay}s`,
              } as CSSProperties
            }
          >
            <span
              className={styles.pipeLight}
              style={{ width: `${+((LIGHT / run) * 100).toFixed(3)}%` }}
            />
          </span>
        </span>
      </span>
    );
  });
}

function RoomLight({ walls, ceiling, floor, every, delay, lamps = 1 }: Room) {
  const top = Math.min(...ceiling);
  const bottom = Math.max(...floor);
  const at = (y: number) => `${+(((y - top) / (bottom - top)) * 100).toFixed(2)}%`;

  return (
    <span
      className={styles.room}
      style={
        {
          left: across(walls[0]),
          top: down(top),
          width: across(walls[1] - walls[0]),
          height: down(bottom - top),
          clipPath: `polygon(0 ${at(ceiling[0])}, 100% ${at(ceiling[1])}, 100% ${at(floor[1])}, 0 ${at(floor[0])})`,
          "--lamps": lamps,
          "--every": `${every}s`,
          "--delay": `${-delay}s`,
        } as CSSProperties
      }
    />
  );
}

export default function BuildingLife({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.life} ${className}`} aria-hidden="true">
      {rooms.map((room, index) => (
        <RoomLight key={index} {...room} />
      ))}
      {pipes.map((pipe, index) => (
        <PipeLight key={index} {...pipe} />
      ))}
      {shafts.map(({ left, every, delay }) => (
        <span
          key={left}
          className={styles.shaft}
          style={
            {
              left: across(left),
              top: down(SHAFT_TOP),
              width: across(SHAFT_WIDTH),
              height: down(SHAFT_HEIGHT),
              "--every": `${every}s`,
              "--delay": `${-delay}s`,
            } as CSSProperties
          }
        >
          <span className={styles.lift} />
        </span>
      ))}
    </div>
  );
}

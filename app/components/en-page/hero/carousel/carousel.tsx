"use client";

import Image, { type ImageProps } from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent as ReactTouchEvent,
} from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

import { AnimatedSlideBackground } from "@/app/components/animated-slide-background/animated-slide-background";

import styles from "./carousel.module.css";

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;
const SLIDE_PROGRESS_DURATION = 5000;
const RETURN_TO_PREVIOUS_SWIPE_THRESHOLD = 40;

export type HeroCarouselOptions = Parameters<typeof useEmblaCarousel>[0];

export type HeroCarouselAction = {
  label: string;
  desktopLabel?: string;
  href: string;
  icon?: "chevron-right" | "chevron-down";
  onClick?: () => void;
};

export type HeroCarouselSlideStyleSlot =
  | "slide"
  | "media"
  | "image"
  | "overlay"
  | "spinner"
  | "content"
  | "eyebrow"
  | "title"
  | "description"
  | "actions"
  | "primaryAction"
  | "secondaryAction"
  | "secondaryActionIcon";

export type HeroCarouselSlideStyles = Partial<
  Record<HeroCarouselSlideStyleSlot, CSSProperties>
>;

export type HeroCarouselSlideClassNames = Partial<
  Record<HeroCarouselSlideStyleSlot, string>
>;

export type HeroCarouselSlide = {
  id?: string;
  src: ImageProps["src"];
  desktopSrc?: ImageProps["src"];
  alt: string;
  sizes?: string;
  objectPosition?: CSSProperties["objectPosition"];
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryAction?: HeroCarouselAction;
  secondaryAction?: HeroCarouselAction;
  showControls?: boolean;
  animatedBackground?: boolean;
  styles?: HeroCarouselSlideStyles;
  classNames?: HeroCarouselSlideClassNames;
};

export type HeroCarouselProps = {
  slides: readonly HeroCarouselSlide[];
  options?: HeroCarouselOptions;
  ariaLabel?: string;
  className?: string;
  mode?: "responsive" | "mobile" | "desktop";
};

const DEFAULT_OPTIONS: NonNullable<HeroCarouselOptions> = {
  axis: "y",
  containScroll: "trimSnaps",
  // The final slide hands an upward touch gesture to the page before Embla
  // begins a drag. This prevents the carousel's boundary clamp from tugging.
  watchDrag: (api, event) =>
    event.type !== "touchstart" || api.canScrollNext(),
};

function getSlideKey(slide: HeroCarouselSlide, index: number) {
  if (slide.id) return slide.id;
  if (typeof slide.src === "string") return `${slide.src}-${index}`;
  return `static-image-${index}`;
}

function mergeClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(" ");
}

function clampDragToCarouselBounds(api: EmblaApi) {
  const engine = api.internalEngine();
  if (engine.options.loop) return;

  const vectors = [
    engine.location,
    engine.offsetLocation,
    engine.previousLocation,
    engine.target,
  ];
  const hasOverscrolled = vectors.some(
    (vector) => engine.limit.constrain(vector.get()) !== vector.get(),
  );

  if (!hasOverscrolled) return;

  vectors.forEach((vector) => {
    vector.set(engine.limit.constrain(vector.get()));
  });
  engine.translate.to(engine.offsetLocation.get());
}

function LazyLoadImage({
  slide,
  index,
  slideCount,
  inView,
  isActive,
  mode,
  children,
}: {
  slide: HeroCarouselSlide;
  index: number;
  slideCount: number;
  inView: boolean;
  isActive: boolean;
  mode: NonNullable<HeroCarouselProps["mode"]>;
  children?: React.ReactNode;
}) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const hasAnimatedBackground = Boolean(slide.animatedBackground);
  const shouldRenderImage = inView || index === 0;
  const hasTextContent = Boolean(
    slide.eyebrow ||
      slide.title ||
      slide.description ||
      slide.primaryAction ||
      slide.secondaryAction,
  );

  return (
    <div
      className={mergeClassNames(
        styles.slide,
        isActive && styles.slideActive,
        slide.classNames?.slide,
      )}
      style={slide.styles?.slide}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${slideCount}`}
    >
      <div className={styles.motionLayer}>
      <div
        className={mergeClassNames(
          styles.lazyLoad,
          (hasLoaded || hasAnimatedBackground) && styles.lazyLoadLoaded,
          slide.classNames?.media,
        )}
        style={slide.styles?.media}
      >
        {!hasAnimatedBackground && !hasLoaded && (
          <span
            className={mergeClassNames(
              styles.spinner,
              slide.classNames?.spinner,
            )}
            style={slide.styles?.spinner}
            aria-hidden="true"
          />
        )}

        {hasAnimatedBackground && mode !== "desktop" && (
          <div className={styles.mobileAnimatedBackground}>
            <AnimatedSlideBackground active={isActive} />
          </div>
        )}

        {shouldRenderImage && !hasAnimatedBackground && mode !== "desktop" && (
          <Image
            className={mergeClassNames(
              styles.image,
              styles.mobileImage,
              slide.classNames?.image,
            )}
            src={slide.src}
            alt={slide.alt}
            fill
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, 1px"
            style={{
              ...slide.styles?.image,
              ...(slide.objectPosition
                ? { objectPosition: slide.objectPosition }
                : {}),
            }}
            onLoad={() => setHasLoaded(true)}
          />
        )}

        {shouldRenderImage && slide.desktopSrc && mode !== "mobile" && (
          <Image
            className={mergeClassNames(
              styles.image,
              styles.desktopImage,
              slide.classNames?.image,
            )}
            src={slide.desktopSrc}
            alt={slide.alt}
            fill
            unoptimized
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            sizes="(min-width: 641px) 100vw, 1px"
            style={{
              ...slide.styles?.image,
              ...(slide.objectPosition
                ? { objectPosition: slide.objectPosition }
                : {}),
            }}
            onLoad={() => setHasLoaded(true)}
          />
        )}

        <span
          className={mergeClassNames(
            styles.overlay,
            slide.classNames?.overlay,
          )}
          style={slide.styles?.overlay}
          aria-hidden="true"
        />
      </div>

      {hasTextContent && (
        <div
          className={mergeClassNames(
            styles.content,
            slide.classNames?.content,
          )}
          style={slide.styles?.content}
        >
          {slide.eyebrow && (
            <p
              className={mergeClassNames(
                styles.eyebrow,
                slide.classNames?.eyebrow,
              )}
              style={slide.styles?.eyebrow}
            >
              {slide.eyebrow}
            </p>
          )}
          {slide.title && (
            <h2
              className={mergeClassNames(
                styles.title,
                slide.classNames?.title,
              )}
              style={slide.styles?.title}
            >
              {slide.title}
            </h2>
          )}
          {slide.description && (
            <p
              className={mergeClassNames(
                styles.description,
                slide.classNames?.description,
              )}
              style={slide.styles?.description}
            >
              {slide.description}
            </p>
          )}

          {(slide.primaryAction || slide.secondaryAction) && (
            <div
              className={mergeClassNames(
                styles.actions,
                slide.classNames?.actions,
              )}
              style={slide.styles?.actions}
            >
              {slide.primaryAction && (
                <a
                  className={mergeClassNames(
                    styles.primaryAction,
                    slide.classNames?.primaryAction,
                  )}
                  style={slide.styles?.primaryAction}
                  href={slide.primaryAction.href}
                  onClick={(event) => {
                    if (!slide.primaryAction?.onClick) return;
                    event.preventDefault();
                    slide.primaryAction.onClick();
                  }}
                >
                  <span className={styles.mobileActionLabel}>
                    {slide.primaryAction.label}
                  </span>
                  <span className={styles.desktopActionLabel}>
                    {slide.primaryAction.desktopLabel ?? slide.primaryAction.label}
                  </span>
                </a>
              )}
              {slide.secondaryAction && (
                <a
                  className={mergeClassNames(
                    styles.secondaryAction,
                    slide.classNames?.secondaryAction,
                  )}
                  style={slide.styles?.secondaryAction}
                  href={slide.secondaryAction.href}
                >
                  <span className={styles.mobileActionLabel}>
                    {slide.secondaryAction.label}
                  </span>
                  <span className={styles.desktopActionLabel}>
                    {slide.secondaryAction.desktopLabel ?? slide.secondaryAction.label}
                  </span>
                  <svg
                    className={mergeClassNames(
                      styles.actionIcon,
                      slide.secondaryAction.icon === "chevron-down" &&
                        styles.actionIconDown,
                      slide.classNames?.secondaryActionIcon,
                    )}
                    style={slide.styles?.secondaryActionIcon}
                    viewBox="0 0 6 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1L5 5L1 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {children}
      </div>
    </div>
  );
}

export function HeroCarousel({
  slides,
  options,
  ariaLabel = "Hero images",
  className,
  mode = "responsive",
}: HeroCarouselProps) {
  const [isViewportDesktop, setIsViewportDesktop] = useState(false);
  const isDesktop =
    mode === "desktop" || (mode === "responsive" && isViewportDesktop);

  useEffect(() => {
    if (mode !== "responsive") return;

    const mediaQuery = window.matchMedia("(min-width: 641px)");
    const updateMode = () => setIsViewportDesktop(mediaQuery.matches);

    updateMode();
    mediaQuery.addEventListener("change", updateMode);

    return () => mediaQuery.removeEventListener("change", updateMode);
  }, [mode]);

  const emblaOptions = useMemo(
    () => ({
      ...DEFAULT_OPTIONS,
      ...options,
      axis: isDesktop ? ("x" as const) : ("y" as const),
      watchDrag: isDesktop ? true : DEFAULT_OPTIONS.watchDrag,
    }),
    [isDesktop, options],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const isLastSlide =
    scrollSnaps.length > 0 && selectedIndex === scrollSnaps.length - 1;
  const progressRemainingRef = useRef(SLIDE_PROGRESS_DURATION);
  const progressStartedAtRef = useRef<number | null>(null);
  const progressTimeoutRef = useRef<number | null>(null);
  const progressSlideIndexRef = useRef(0);
  const lastSlideTouchStartYRef = useRef<number | null>(null);

  const updateSlidesInView = useCallback((api: EmblaApi) => {
    setSlidesInView((currentSlides) => {
      const nextSlides = new Set(currentSlides);
      api.slidesInView().forEach((index) => nextSlides.add(index));
      if (nextSlides.size === currentSlides.length) return currentSlides;
      return Array.from(nextSlides);
    });
  }, []);

  const updateControls = useCallback((api: EmblaApi) => {
    setSelectedIndex(api.selectedScrollSnap());
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const pauseProgressTimer = useCallback(() => {
    if (progressTimeoutRef.current !== null) {
      window.clearTimeout(progressTimeoutRef.current);
      progressTimeoutRef.current = null;
    }

    if (progressStartedAtRef.current === null) return;

    const elapsed = performance.now() - progressStartedAtRef.current;
    progressRemainingRef.current = Math.max(
      0,
      progressRemainingRef.current - elapsed,
    );
    progressStartedAtRef.current = null;
  }, []);

  const handlePointerDown = useCallback(() => {
    pauseProgressTimer();
    setIsDragging(true);
  }, [pauseProgressTimer]);

  const handlePointerUp = useCallback((api: EmblaApi) => {
    clampDragToCarouselBounds(api);
    setIsDragging(false);
  }, []);

  const handleLastSlideTouchStart = useCallback(
    (event: ReactTouchEvent<HTMLDivElement>) => {
      if (isDesktop || !isLastSlide || event.touches.length !== 1) return;

      lastSlideTouchStartYRef.current = event.touches[0].clientY;
    },
    [isDesktop, isLastSlide],
  );

  const handleLastSlideTouchEnd = useCallback(
    (event: ReactTouchEvent<HTMLDivElement>) => {
      const touchStartY = lastSlideTouchStartYRef.current;
      const touchEnd = event.changedTouches[0];

      lastSlideTouchStartYRef.current = null;

      if (isDesktop || !emblaApi || touchStartY === null || !touchEnd) return;

      const verticalDistance = touchEnd.clientY - touchStartY;
      if (verticalDistance >= RETURN_TO_PREVIOUS_SWIPE_THRESHOLD) {
        emblaApi.scrollPrev();
      }
    },
    [emblaApi, isDesktop],
  );

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("select", updateControls);
    emblaApi.on("reInit", updateSlidesInView);
    emblaApi.on("reInit", updateControls);
    emblaApi.on("scroll", clampDragToCarouselBounds);
    emblaApi.on("pointerDown", handlePointerDown);
    emblaApi.on("pointerUp", handlePointerUp);

    const frame = window.requestAnimationFrame(() => {
      updateSlidesInView(emblaApi);
      updateControls(emblaApi);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      emblaApi.off("slidesInView", updateSlidesInView);
      emblaApi.off("select", updateControls);
      emblaApi.off("reInit", updateSlidesInView);
      emblaApi.off("reInit", updateControls);
      emblaApi.off("scroll", clampDragToCarouselBounds);
      emblaApi.off("pointerDown", handlePointerDown);
      emblaApi.off("pointerUp", handlePointerUp);
    };
  }, [
    emblaApi,
    handlePointerDown,
    handlePointerUp,
    updateControls,
    updateSlidesInView,
  ]);

  useEffect(() => {
    if (progressSlideIndexRef.current !== selectedIndex) {
      progressSlideIndexRef.current = selectedIndex;
      progressRemainingRef.current = SLIDE_PROGRESS_DURATION;
      progressStartedAtRef.current = null;
    }

    if (!emblaApi || scrollSnaps.length < 2 || isDragging) return;

    progressStartedAtRef.current = performance.now();

    progressTimeoutRef.current = window.setTimeout(() => {
      progressTimeoutRef.current = null;
      progressStartedAtRef.current = null;
      progressRemainingRef.current = 0;

      const nextIndex = selectedIndex + 1;

      if (nextIndex < scrollSnaps.length) {
        emblaApi.scrollTo(nextIndex);
      } else {
        emblaApi.scrollTo(0, true);
      }
    }, progressRemainingRef.current);

    return pauseProgressTimer;
  }, [
    emblaApi,
    isDragging,
    pauseProgressTimer,
    scrollSnaps.length,
    selectedIndex,
  ]);

  if (slides.length === 0) return null;

  return (
    <section
      className={`${styles.carousel} ${className ?? ""} relative z-0`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        className={mergeClassNames(
          styles.viewport,
          isLastSlide && styles.viewportAtEnd,
        )}
        ref={emblaRef}
        onTouchStart={handleLastSlideTouchStart}
        onTouchEnd={handleLastSlideTouchEnd}
      >
        <div
          className={mergeClassNames(
            styles.container,
            isLastSlide && styles.containerAtEnd,
          )}
        >
          {slides.map((slide, index) => (
            
            <LazyLoadImage
              key={getSlideKey(slide, index)}
              slide={slide}
              index={index}
              slideCount={slides.length}
              inView={slidesInView.includes(index)}
              isActive={selectedIndex === index}
              mode={mode}
            />
          ))}
        </div>
      </div>

      {slides.length > 1 && slides[selectedIndex]?.showControls !== false && (
        <div className={styles.controls}>
          <div
            className={styles.dots}
            role="group"
            aria-label="Choose slide"
          >
            {scrollSnaps.map((_, index) => {
              const isSelected = index === selectedIndex;
              const isViewed = index < selectedIndex;

              return (
                <button
                  key={index}
                  className={`${styles.dot} ${
                    isSelected
                      ? isDragging
                        ? styles.dotSelectedPaused
                        : styles.dotSelected
                      : ""
                  } ${isViewed ? styles.dotViewed : ""}`}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isSelected ? "true" : undefined}
                >
                  {isSelected && (
                    <span
                      key={selectedIndex}
                      className={mergeClassNames(
                        styles.dotProgress,
                        isDragging && styles.dotProgressPaused,
                      )}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroCarousel;

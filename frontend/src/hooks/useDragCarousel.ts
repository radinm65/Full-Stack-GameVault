import { useRef, useState } from "react";
import type {
  CSSProperties,
  Dispatch,
  MouseEvent,
  PointerEvent,
  SetStateAction,
} from "react";

const DRAG_START_DISTANCE = 5;
const SWIPE_THRESHOLD = 0.15;

// Mouse / touch drag for a track of full-width slides.
// Spread `trackHandlers` and `trackStyle` on the track, attach `carouselRef` to its wrapper.
export default function useDragCarousel(
  count: number,
  currentSlide: number,
  setCurrentSlide: Dispatch<SetStateAction<number>>,
) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const hasDragged = useRef(false);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    hasDragged.current = false;
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const delta = e.clientX - dragStartX.current;

    if (!hasDragged.current) {
      if (Math.abs(delta) < DRAG_START_DISTANCE) return;
      hasDragged.current = true;
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    // resist dragging past the first / last slide
    const atFirstEdge = currentSlide === 0 && delta > 0;
    const atLastEdge = currentSlide === count - 1 && delta < 0;
    setDragOffset(atFirstEdge || atLastEdge ? delta / 3 : delta);
  };

  const handlePointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const width = carouselRef.current?.clientWidth ?? 1;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;

    if (hasDragged.current) {
      if (delta < -width * SWIPE_THRESHOLD) {
        setCurrentSlide((prev) => Math.min(prev + 1, count - 1));
      } else if (delta > width * SWIPE_THRESHOLD) {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  // a drag must not count as a click on links inside the slides
  const handleClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged.current = false;
    }
  };

  const trackStyle: CSSProperties = {
    transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
  };

  return {
    carouselRef,
    isDragging,
    trackStyle,
    trackHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
      onClickCapture: handleClickCapture,
    },
  };
}

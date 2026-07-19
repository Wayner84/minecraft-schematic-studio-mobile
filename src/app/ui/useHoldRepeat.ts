import { useCallback, useRef } from 'react';

type HoldRepeatOptions = {
  delay?: number;
  interval?: number;
};

// Fires onStep immediately on press, then repeatedly while held — lets a single
// press-and-hold cover what would otherwise take many individual taps (e.g. layer scrubbing).
export function useHoldRepeat(onStep: () => void, { delay = 350, interval = 90 }: HoldRepeatOptions = {}) {
  const timer = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      window.clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback((e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    stop();
    onStep();
    timer.current = window.setTimeout(() => {
      timer.current = window.setInterval(onStep, interval);
    }, delay);
  }, [onStep, stop, delay, interval]);

  return {
    onPointerDown: start,
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
  };
}

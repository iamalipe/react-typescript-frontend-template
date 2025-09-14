import { useCallback, useEffect, useRef } from "react";

// Define the type for the effect function
type EffectCallback = () => void | (() => void | undefined);
type DependencyList = ReadonlyArray<unknown>;

export default function useDebounce(
  effect: EffectCallback,
  dependencies: DependencyList,
  delay: number,
  skipFirstRun: boolean = false
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, dependencies);
  const firstRun = useRef(true);

  useEffect(() => {
    if (skipFirstRun && firstRun.current) {
      firstRun.current = false;
      return; // skip on first run
    }

    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay, skipFirstRun]);
}

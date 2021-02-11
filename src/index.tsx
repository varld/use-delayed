import { useEffect, useState } from 'react';
import { arraysEqual } from './arraysEqual';

let useDelayed = <T,>(value: T, delay: number, ignore?: any[]) => {
  let [state, setState] = useState(() => value);
  let [cachedIgnore, setCachedIgnore] = useState(() => ignore || []);

  useEffect(() => {
    if (!Array.isArray(ignore)) {
      if (Array.isArray(cachedIgnore)) setCachedIgnore([]);
      return;
    }

    if (!arraysEqual(ignore, cachedIgnore)) setCachedIgnore(ignore);
  }, [ignore]);

  useEffect(() => {
    if (Array.isArray(cachedIgnore) && cachedIgnore.indexOf(value) != -1) {
      setState(value);
      return;
    }

    let to = setTimeout(() => {
      setState(value);
    }, delay);

    return () => clearTimeout(to);
  }, [value, delay, cachedIgnore]);

  return state;
};

export default useDelayed;

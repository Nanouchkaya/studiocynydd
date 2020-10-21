import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function timer() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(timer, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
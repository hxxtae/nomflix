import { useState, useLayoutEffect } from 'react';

export function useResize( classname: string ) {
  const [size, setSize] = useState(0);
  
  useLayoutEffect(() => {
    const resizeHandler = () => {
      const $ul = document.querySelector(classname);
      if (!$ul) return;
      setSize($ul.clientHeight);
    }
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, [classname]);
  return size;
}

import { useState, useEffect } from 'react';

export function useResize( classname: string, other?: any ) {
  const [size, setSize] = useState(0);
  
  // -----------------------
  // Resize element set height
  // -----------------------
  useEffect(() => {
    const resizeHandler = () => {
      const $ul = document.querySelector(classname);
      if (!$ul) return;
      setSize($ul.clientHeight);
    }
    resizeHandler();

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, [classname, other]);

  // -----------------------
  // Init element set height
  // -----------------------
  useEffect(() => {
    const timeRef = window.setTimeout(() => {
      const $ul = document.querySelector(classname);
      if (!$ul) return;
      setSize($ul.clientHeight);
    }, 500);

    return () => {
      window.clearTimeout(timeRef);
    }
  }, [classname]);

  return size;
}

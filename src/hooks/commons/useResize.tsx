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
  // - min height: 30
  // -----------------------
  useEffect(() => {
    const timeRef = window.setInterval(() => {
      const $ul = document.querySelector(classname);
      if (!$ul) return;
      setSize($ul.clientHeight);
      if ($ul.clientHeight > 50) {
        window.clearInterval(timeRef)
      }
    }, 500);

    return () => {
      window.clearInterval(timeRef);
    }
  }, [classname]);

  return size;
}

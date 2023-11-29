import { useState, useEffect } from 'react';

export function useResize( classname: string, other?: any ) {
  const [size, setSize] = useState(0);
  
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
  return size;
}

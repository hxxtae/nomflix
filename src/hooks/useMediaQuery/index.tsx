import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matche, setMatche] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    console.log('Media')

    if (media.matches !== matche) {
      setMatche(media.matches);
    }
    
    const listener = () => {
      setMatche(media.matches);
    }

    if (typeof media.addEventListener === "function") {
      media.addEventListener('change', listener);
    }

    return () => {
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener('change', listener);
      }
    }
  }, [matche, query]);

  return matche;
}

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matche, setMatche] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    // console.log('Media')

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

// NOTE: https://samuelkraft.com/blog/responsive-animation-framer-motion

// 노트북 & 태블릿 가로 : 1024px ~ 1279px
// 태블릿 가로 : 768px ~ 1023px
// 모바일 가로 & 태블릿 세로 : 480px ~ 767px
// 모바일 : ~479px
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { media } from '../../utils';
import { LAYOUT_Z_INDEX } from '../../global';

export const splashVariant = {
  variants: {
    init: {
      opacity: 1,
    },
    start: {
      opacity: 1,
    },
    end: {
      opacity: 0,
      transition: {
        duration: 1
      }
    }
  },
  initial: "init",
  animate: "start",
  exit: "end"
};

export const Section = styled(motion.section)`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.mainColor};
  z-index: ${LAYOUT_Z_INDEX.splash};
`;

export const ImageBox = styled.div`
  position: relative;

  transform-origin: 20px center;
  transform: translate3d(calc(50% - 20px), 0, 0) scale(1.5);
  animation: splashAnimation 1s ease-out forwards 1s;

  &:after {
    content: '';
    width: 100%;
    height: calc(100% + 3px);
    position: absolute;
    top: -3px;
    left: 0;
    background-color: ${({ theme }) => theme.bgColor};

    transform: translate3d(17%, 0, 0);
    animation: splashAnimation2 1s ease-out forwards 1s;
  }
`;

export const Image = styled.img`
  width: 300px;

  ${media('mobile')} {
    width: 200px;
  }

  @keyframes splashAnimation {
    0% {
      transform: translate3d(calc(50% - 20px), 0, 0) scale(1.5);
    }

    30% {
      transform: translate3d(calc(50% - 20px), 0, 0) scale(1);
    }

    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes splashAnimation2 {
    0%,
    30% {
      transform: translate3d(17%, 0, 0);
    }

    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
`;
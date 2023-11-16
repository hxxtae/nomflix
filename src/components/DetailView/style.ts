import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from '../../utils';

const BTN_SIZE = 38;

export const onBannerVariants = {
  hidden: {
    scale: .7,
    opacity: .5
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      duration: .2
    }
  },
  exit: {
    scale: 0,
  }
}

export const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

export const Section = styled(motion.section)`
  position: absolute;
  bottom: 0;
  max-width: 816px;
  width: 100%;
  height: 95vh;
  background-color: ${props => props.theme.bgColor};
  border-radius: 10px;
  overflow: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  z-index: 1;

  ${media('mobile')} {
    max-width: 616px;
  }
`;

export const Close = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${BTN_SIZE}px;
  height: ${BTN_SIZE}px;
  border: none;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
`;

export const Prev = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${BTN_SIZE}px;
  height: ${BTN_SIZE}px;
  border: none;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;
`

export const Image = styled(motion.div)<{bgphoto: string}>`
  width: 100%;
  min-height: 300px;
  aspect-ratio: 16 / 9;
  background-image: linear-gradient(rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

export const Overlay = styled(motion.div)`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { media } from '../../utils';

export const listVariants = (time: number) => ({
  init: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: (0.5 * time),
    }
  }
});

export const Wrapper = styled.div<{ height: number }>`
  position: relative;
  left: 0;
  height: ${({ height }) => height}px;
  margin-left: 60px;

  ${media('mobile')} {
    margin-left: 20px;
  }
`;

export const List = styled(motion.ul)`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
  animation: brightList 1s infinite alternate ease-in;

  @keyframes brightList {
    0% {
      opacity: .2;
    }

    100% {
      opacity: 1;
    }
  }
`;

export const Item = styled(motion.li)`
  width: 210px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.thirdColor};
  aspect-ratio: 16 / 9;
  flex: 1;

  ${media('mobile')} {
    width: 150px;
  }
`;

import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Box = styled(motion.li)`
  position: relative;
  font-size: 30px;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
`;

export const Rank = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const Poster = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
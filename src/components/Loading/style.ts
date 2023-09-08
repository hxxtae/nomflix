import { motion } from 'framer-motion';
import styled from 'styled-components';

export const loadVariants = {
  before: {
    rotate: 0,
  },
  start: {
    rotate: 360,
    transition: {
      type: 'tween',
      duration: 1,
      repeat: Infinity,
    }
  }
}

export const Loader = styled(motion.section)`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

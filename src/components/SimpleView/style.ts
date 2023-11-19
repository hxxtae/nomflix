import { motion } from 'framer-motion';
import styled from 'styled-components';

const BTN_SIZE = 38;

export const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

export const Section = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 1500px;
`;

export const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
`;

export const Close = styled.button`
  position: absolute;
  top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${BTN_SIZE}px;
  height: ${BTN_SIZE}px;
  border: 2px solid #ffffff;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;

  &:hover {
    opacity: .8;
  }
`;
import { motion } from "framer-motion";
import styled from 'styled-components';

// ---------------
// Animation
// ---------------
export const iconShowAnimation = {
  opacity: 1,
  transition: {
    duration: 0
  }
}

export const iconHiddenAnimation = {
  opacity: 0,
  transition: {
    duration: 0
  }
}

export const searchCloseAnimation = {
  scaleX: 0,
  transition: {
    duration: 0,
  } 
}

export const searchOpenAnimation = {
  scaleX: 1,
  transition: {
    duration: .2,
  } 
}

// ---------------
// Style
// ---------------
export const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
`;

export const OutIcon = styled(motion.div)`
  width: 30px;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Wrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transform-origin: right center;
  right: 0;
`;

export const InnerIcon = styled(motion.div)`
  position: absolute;
  left: 6px;
  width: 30px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Input = styled(motion.input)`
  width: 270px;
  height: 42px;
  padding-left: 40px;
  padding-right: 10px;
  border: 1px solid white;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  
  &:focus {
    outline: 0;
  }

  &:focus:not(:focus-visible) {
    outline: 0;
  }
`;
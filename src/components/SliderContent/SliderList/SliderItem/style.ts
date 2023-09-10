import styled from 'styled-components';
import { motion } from 'framer-motion';

export const boxHoverVariants = {
  // Parent Hover
  hover: {
    scale: 1.3,
    top: "-50px",
    transition: {
      delay: 0.5,
      duration: 0.3
    }
  }
}

export const infoHoverVariants = {
  // Child Hover
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3
    }
  },
}

export const Box = styled(motion.li)`
  position: relative;
  flex-direction: column;
  color: red;
  font-size: 30px;
  border-radius: 6px;
  height: 162px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  &:hover {
    z-index: 1;
  }
`;

export const BoxImg = styled(motion.img)`
  border-radius: 6px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Info = styled(motion.div)`
  position: absolute;
  bottom: -100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  padding: 15px;
  width: 100%;
  height: 100px;
  background-color: ${props => props.theme.bgColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  opacity: 0;

  button {
    width: 35px;
    height: 35px;
    border: 2px solid rgba(80, 80, 80, 1);
    border-radius: 50%;
    background-color: ${props => props.theme.bgColor};
    margin-right: 5px;

    &:first-child {
      background-color: rgba(210, 210, 210, 1);
      border: 2px solid rgba(210, 210, 210, 1);
    }

    &:hover {
      border: 2px solid rgba(210, 210, 210, 1);
    }
  }

  span {
    font-size: 14px;
    color: ${props => props.theme.textColor};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  flex-wrap: wrap;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, .8);
    cursor: pointer;

    &:first-child {
      color: rgba(0, 0, 0, .8);
    }
  }
`;
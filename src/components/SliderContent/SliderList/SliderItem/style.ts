import styled from 'styled-components';
import { motion } from 'framer-motion';

export const boxHoverVariants = (match: boolean) => ({
  // Parent Hover
  hover: {
    scale: match ? 1 : 1.3,
    top: match ? "0" : "-50px",
    transition: {
      delay: 0.5,
      duration: 0.3
    }
  }
})

export const imageHoverVariants = (match: boolean) => ({
  // Child Hover
  hover: {
    borderBottomLeftRadius: match ? "6px" : 0,
    borderBottomRightRadius: match ? "6px" : 0,
    transition: {
      delay: 0.5,
      duration: 0.3
    }
  },
})

export const infoHoverVariants = (match: boolean) => ({
  // Child Hover
  hover: {
    opacity: match ? 0 : 1,
    transition: {
      delay: 0.5,
      duration: 0.3
    }
  },
})

export const Box = styled(motion.li)`
  position: relative;
  flex-direction: column;
  color: red;
  font-size: 30px;
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

  span {
    font-size: 14px;
    color: ${props => props.theme.textColor};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    flex: 1;
    border: 2px solid rgba(80, 80, 80, 1);
    border-radius: 50%;
    color: rgba(255, 255, 255, .8);
    background-color: ${props => props.theme.bgColor};
    cursor: pointer;

    &:first-child {
      background-color: rgba(210, 210, 210, 1);
      border: 2px solid rgba(210, 210, 210, 1);
      color: rgba(0, 0, 0, .8);
    }

    &:hover {
      border: 2px solid rgba(210, 210, 210, 1);
    }
  }
`;
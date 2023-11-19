import styled, { css } from 'styled-components';
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

export const iconAniProps = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.3
    }
  }
}

const Button = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  flex: 1;
  border: 2px solid rgba(80, 80, 80, 1);
  border-radius: 50%;
  font-size: 1rem;
  color: rgba(255, 255, 255, .8);
  background-color: ${props => props.theme.bgColor};
  cursor: pointer;

  &:first-child {
    background-color: rgba(255, 255, 255, 1);
    border: 2px solid rgba(255, 255, 255, 1);
    color: rgba(0, 0, 0, 1);
  }

  &:hover {
    border: 2px solid rgba(255, 255, 255, 1);
  }
`;

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
  bottom: -110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  padding: 10px 15px 10px;
  width: 100%;
  height: 110px;
  background-color: ${props => props.theme.bgColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  opacity: 0;
  overflow: hidden;
`;

export const ButtonGroup = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;

export const Play = styled.button`
  ${Button};

  &:hover {
    opacity: .8;
  }
`;

export const Favorit = styled.button`
  ${Button};

  i {
    width: 1rem;
    height: 1rem;
  }
`;

export const Like = styled.button`
  ${Button};
`;

export const Title = styled.span`
  /* text truncate */
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.1rem;
  font-size: 14px;
  color: ${({ theme }) => theme.textColor};
`;

export const VoteAndGenre = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.1rem;
  font-size: 12px;
  font-weight: 600;

  strong {
    color: #46d369;
  }

  p {
    color: ${({ theme }) => theme.textColor};
  }
`;

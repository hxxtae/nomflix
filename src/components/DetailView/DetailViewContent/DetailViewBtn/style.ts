import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

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
  width: 40px;
  height: 40px;
  padding: 0;
  border: 2px solid rgba(80, 80, 80, 1);
  border-radius: 50%;
  background-color: ${props => props.theme.bgColor};
  font-size: 1rem;
  color: rgba(255, 255, 255, .8);
  cursor: pointer;

  &:hover {
    border: 2px solid rgba(255, 255, 255, 1);
  }

  &:active {
    filter: opacity(80%);
    /* NOTE: opacity: .8; 을 적용하면 active 시 element가 아래로 밀리는 이슈가 발생한다. */
  }
`;

export const ButtonGroup = styled(motion.div)`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 20px 0px;
  margin-bottom: 50px;
`;

export const Play = styled.button`
  ${Button};
  width: 150px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  font-size: 24px;
  border: none;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);

  &:hover {
    opacity: .8;
  }

  span {
    margin-left: 14px;
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

export const Popular = styled.p`
  width: fit-content;
  padding: 8px;
  border: none;
  border-radius: 7px;
  line-height: 1;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.mainColor};

  span {
    margin-left: 3px;
  }
`;

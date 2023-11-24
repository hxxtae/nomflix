import styled from 'styled-components';
import { media } from '../../../utils';

export const Slider = styled.div<{ setHeight: number }>`
  position: relative;
  height: ${({ setHeight }) => `${setHeight}px`};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1;
`;
export const Increadiv = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  z-index: 1;
`;
export const Decreadiv = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
`;
export const NextButton = styled.button`
  width: 50px;
  height: 100%;
  border: transparent;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, .5);
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  ${media('mobile')} {
    width: 30px;
  }
`;

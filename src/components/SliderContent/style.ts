import styled from 'styled-components';

export const Slider = styled.div`
  position: relative;
  transform: translateY(-100px);
  height: 162px;
  margin-bottom: 100px;
`;
export const Increadiv = styled.div`
  position: absolute;
  left: 0;
  z-index: 1;
`;
export const Decreadiv = styled.div`
  position: absolute;
  right: 0;
`;
export const NextButton = styled.button`
  height: 162px;
  background-color: rgba(0, 0, 0, .5);
  border: transparent;
  border-radius: 5px;
  color: rgba(255, 255, 255, 1);
  width: 50px;
  cursor: pointer;
`;

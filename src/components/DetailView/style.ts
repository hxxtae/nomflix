import { motion, MotionValue } from 'framer-motion';
import styled from 'styled-components';

export const Overlay = styled(motion.div)`
  opacity: 0;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export const Section = styled(motion.section)<{scrolly: MotionValue<number>}>`
  position: fixed;
  width: 42vw;
  height: 90vh;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.bgColor};
  border-radius: 10px;
  overflow: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  z-index: 3;
`;

export const ContentHeader = styled(motion.div)<{bgphoto: string}>`
  width: 100%;
  height: 450px;
  background-image: linear-gradient(rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

export const ContentWrapper = styled.div`
  position: relative;
  top: -80px;
  padding: 0 40px;
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  font-size: 46px;
`;

export const ButtonGroup = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;

  button {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(80, 80, 80, 1);
    border-radius: 50%;
    background-color: ${props => props.theme.bgColor};
    margin-right: 10px;
    color: rgba(255, 255, 255, .8);
    cursor: pointer;

    &:active {
      opacity: .8;
    }

    &:first-child {
      width: 150px;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 10px;
      margin-right: 20px;
      font-size: 20px;
      font-weight: bold;
      border: none;
      color: rgba(0, 0, 0, .8);

      span {
        margin-right: 22px;
      }
    }
  }
`;

export const Overview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.textColor};
  letter-spacing: 1px;
  line-height: 30px;
  margin-bottom: 100px;
`;

export const Content = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  div {
    width: 120px;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  span {
    margin-bottom: 20px;
  }
`;
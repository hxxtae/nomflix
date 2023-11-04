import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from '../../utils';

export const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

export const Overlay = styled(motion.div)`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Section = styled(motion.section)`
  position: absolute;
  bottom: 0;
  max-width: 816px;
  width: 100%;
  height: 95vh;
  background-color: ${props => props.theme.bgColor};
  border-radius: 10px;
  overflow: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  z-index: 1;

  ${media('mobile')} {
    max-width: 616px;
  }
`;

export const Image = styled(motion.div)<{bgphoto: string}>`
  width: 100%;
  height: 450px;
  background-image: linear-gradient(rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

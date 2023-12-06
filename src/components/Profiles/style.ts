import styled from 'styled-components';
import { motion } from 'framer-motion';

import { LAYOUT_Z_INDEX } from '../../global';

export const Wrapper = styled.section`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5%;
  background-color: ${({ theme }) => theme.bgColor};
  z-index: ${LAYOUT_Z_INDEX.profile};
`;

export const Heading = styled.h1`
  font-size: 3.5vw;
  font-weight: unset;
  color: ${({ theme }) => theme.textColor};
`;

export const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2vw;
  color: ${({ theme }) => theme.thirdColor};
`;

export const Item = styled.li`
  cursor: pointer;
`;

export const Box = styled(motion.div)<{ url: string }>`
  background-image: url(${({ url }) => url});
  background-color: ${({ theme }) => theme.bgColor};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  height: 10vw;
  width: 10vw;
  max-height: 200px;
  max-width: 200px;
  min-height: 84px;
  min-width: 84px;
  position: relative;
  text-decoration: none;
`;

export const Title = styled.span`
  display: block;
  margin: 10px 0;
  font-size: 1.3vw;
  line-height: 1.2em;
  font-weight: bolder;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
`;

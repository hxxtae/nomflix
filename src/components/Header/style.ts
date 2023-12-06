import { motion } from "framer-motion";
import styled from 'styled-components';

import { HEADER_HEIGHT, LAYOUT_Z_INDEX } from '../../global';
import { media } from '../../utils';

export const menuVariants = {
  top: {
    backgroundColor: "rgba(20, 20, 20, 0)"
  },
  scroll: {
    backgroundColor: "rgba(20, 20, 20, 1)"
  }
};

export const Nav = styled(motion.menu)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  /* background-color: ${props => props.theme.bgColor}; */
  background-image: linear-gradient(180deg, rgba(0,0,0,.7) 10%, transparent);
  font-size: 14px;
  padding: 0px 60px;
  color: white;
  z-index: ${LAYOUT_Z_INDEX.header};

  ${media('mobile')} {
    font-size: .7rem;
    padding: 0px 20px;
  }
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.a`
  width: 95px;
  margin-right: 50px;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  ${media('mobile')} {
    width: 75px;
    margin-right: 20px;
  }
`;

export const List = styled(motion.ul)`
  display: flex;
  align-items: center;
`;

export const Item = styled(motion.li)`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 0;
  margin-right: 25px;
  transition: color 0.3s ease-in-out;
  color: ${(props) => props.theme.textColor};

  &:hover {
    color: #b3b3b3;
  }

  &.select {
    font-weight: 600;
  }
`;

export const Line = styled(motion.span)`
  position: absolute;
  width: 100%;
  height: 2px;
  border-radius: 10px;
  bottom: -5px;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.mainColor};
`;

export const ProfileBox = styled(motion.div)`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-left: 30px;
  background-color: ${({ theme }) => theme.bgColor};
  overflow: hidden;
  cursor: pointer;

  img {
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media('mobile')} {
    margin-left: 10px;
  }
`;
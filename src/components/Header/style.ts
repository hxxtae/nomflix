import { motion } from "framer-motion";
import styled from 'styled-components';

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
  width: 100%;
  top: 0;
  background-color: ${props => props.theme.bgColor};
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 10;
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.a`
  margin-right: 50px;
  width: 95px;
  height: 25px;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  margin-right: 20px;
  transition: color 0.3s ease-in-out;
  color: ${(props) => props.theme.textColor};
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.textColor};
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
  margin: 0 auto;
  background-color: ${(props) => props.theme.mainColor};
`;

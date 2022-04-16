import styled from 'styled-components';
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useForm } from 'react-hook-form';

import React, { useEffect, useState } from 'react';
import { logoVariants, navVariants } from '../constants/animation';

const Nav = styled(motion.nav)`
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

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.mainColor};
  path {
    stroke-width: 6px;
    stroke: transparent;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
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

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  svg {
    height: 25px;
  }
  position: relative;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.mainColor};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute; 
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  border: 1px solid white;
  padding-left: 42px;
  padding-right: 10px;
  height: 40px;
  z-index: -1;
`;

interface IForm {
  keyword: string;
}

function Header() {
  console.log('header');
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useRouteMatch('/'); // useRouteMatch 를 사용하면 re-render 된다??
  const tvMatch = useRouteMatch('/tv');
  const inputAnimation = useAnimation(); // useAnimation()
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll(); // useViewportScroll()
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      })
    } else {
      inputAnimation.start({
        scaleX: 1,
      })
    }
    setSearchOpen(prev => !prev);
  }

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 40) {
        navAnimation.start("scroll"); // scroll -> navVariants 안의 애니메이션 효과
      } else {
        navAnimation.start("top"); // top -> navVariants 안의 애니메이션 효과
      }
    });
  }, [scrollY]); // motionValue의 값은 랜더링에 영향을 주지 않는다.
  
  const { register, handleSubmit } = useForm<IForm>();
  const history = useHistory();
  const onValid = (data: IForm) => {
    history.push(`/search?keyword=${data.keyword}`);
  }

  return (
    <Nav variants={navVariants} initial="top" animate={navAnimation}>
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="active"
          initial="normal"
          xmlns="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home {homeMatch?.isExact && <Circle layoutId="circle"/>}</Link>
          </Item>
          <Item>
            <Link to="/tv">Tv {tvMatch && <Circle layoutId="circle"/>}</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -190 : 0 }}
            transition={{type: "linear"}}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true })}
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
            transition={{ type: "linear" }}
            placeholder="Search for movie for tv show"
            autoComplete='off'
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;


// [ useAnimation() ]
// - 코드를 통해 요소들을 제어할 때 요소들에게 동시에 애니메이션 효과를주기 위해 사용하는 방법이다.
// - 애니메이션 효과를 조건에 따라 동적으로 효과를 변경할 수 있다.

// -> https://www.framer.com/docs/animation/#component-animation-controls


// [ useViewportScroll() ]
// 두 가지의 Return을 반환 하는데
// 1. Progress: x, y 에 대한 스크롤 진행도를 0에서 부터 1사이의 값으로 알 수 있다.
// 2.

// -> https://www.framer.com/docs/motionvalue/##useviewportscroll
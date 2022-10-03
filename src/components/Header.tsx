import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { navVariants } from '../constants/animation';
import { publicUrlStr } from '../utils';

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useRouteMatch(`${publicUrlStr()}/`); // useRouteMatch 를 사용하면 re-render 된다??
  const tvMatch = useRouteMatch(`${publicUrlStr()}/tv`);
  const inputAnimation = useAnimation(); // useAnimation()
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll(); // useViewportScroll()

  const toggleSearch = useCallback(() => {
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
  }, [searchOpen]);

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 40) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
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
        <Logo href={`${publicUrlStr()}/`}>
          <img src={`${publicUrlStr()}/assets/svg/netflix_logo.svg`} alt="netflix logo" />
        </Logo>
        <Items>
          <Item>
            <Link to={`${publicUrlStr()}/`}>Home
              {homeMatch?.isExact && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to={`${publicUrlStr()}/tv`}>Tv
              {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.div
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -190 : 0 }}
            transition={{ type: "linear" }}>
            <img src={`${publicUrlStr()}/assets/svg/search.svg`} alt="search icon"/>
          </motion.div>
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

const Logo = styled.a`
  margin-right: 50px;
  width: 95px;
  height: 25px;

  img {
    display: block;
    width: 100%;
    height: 100%;
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

// [ useAnimation() ]
// - 코드를 통해 요소들을 제어할 때 요소들에게 동시에 애니메이션 효과를주기 위해 사용하는 방법이다.
// - 애니메이션 효과를 조건에 따라 동적으로 효과를 변경할 수 있다.

// -> https://www.framer.com/docs/animation/#component-animation-controls


// [ useViewportScroll() ]
// 두 가지의 Return을 반환 하는데
// 1. Progress: x, y 에 대한 스크롤 진행도를 0에서 부터 1사이의 값으로 알 수 있다.
// 2.

// -> https://www.framer.com/docs/motionvalue/##useviewportscroll
import { useAnimation, useViewportScroll } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from 'react';

import { publicUrlStr } from '../../utils';
import { Search } from '../../components';
import * as S from './style';

function Header() {
  const menuAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const { pathname } = useLocation();

  const movieClick = (): boolean => {
    const menuName = pathname.split('/').at(-1);
    return (menuName === 'movie' || menuName === publicUrlStr().split('/')[1]) ? true : false;
  }

  const tvClick = (): boolean => {
    const menuName = pathname.split('/').at(-1);
    return menuName === 'tv' ? true : false;
  }
  
  useEffect(() => {
    scrollY.onChange(() => {
      scrollY.get() > 40 ?
        menuAnimation.start("scroll") :
        menuAnimation.start("top");
    });
  }, [scrollY, menuAnimation]); // motionValue의 값은 랜더링에 영향을 주지 않는다.(scrollY)

  return (
    <S.Nav variants={S.menuVariants} initial="top" animate={menuAnimation}>
      <S.Col>
        <S.Logo href={`${publicUrlStr()}`}>
          <img src={`${publicUrlStr()}/assets/svg/netflix_logo.svg`} alt="netflix logo" />
        </S.Logo>
        <S.List>
          <S.Item>
            <Link to={`${publicUrlStr()}`}>Movie</Link>
            {movieClick() && <S.Line layoutId="circle" />}
          </S.Item>
          <S.Item>
            <Link to={`${publicUrlStr()}/tv`} >Series</Link>
            {tvClick() && <S.Line layoutId="circle" />}
          </S.Item>
        </S.List>
      </S.Col>
      <S.Col>
        <Search />
      </S.Col>
    </S.Nav>
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
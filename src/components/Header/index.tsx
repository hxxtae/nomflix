import { useAnimation, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { publicUrlStr } from '../../utils';
import { SearchBox } from '../../components';
import { atomOfProfileData } from '../../global';
import * as S from './style';

const menus = [
  { name: 'movie', nicName: 'Movie', path: '' },
  { name: 'tv', nicName: 'Series', path: '/tv' },
  { name: 'mylist', nicName: 'My List', path: '/mylist' }
];

const initSelect = (pathname: string) => {
  const [path1, path2, path3] = menus.map(item => item.name);
  const paths = pathname.split('/');
  if (paths.includes(path1)) return path1;
  if (paths.includes(path2)) return path2;
  if (paths.includes(path3)) return path3;
  return path1;
}

function Header() {
  const menuAnimation = useAnimation();
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [selected, setSelected] = useState<string>(initSelect(pathname));
  const profileData = useRecoilValue(atomOfProfileData);

  useMotionValueEvent(scrollY, 'change', (getY) => {
    getY > 40 ?
      menuAnimation.start("scroll") :
      menuAnimation.start("top");
  });
  
  const onSelect = (name: string) => {
    setSelected(name);
  };

  useEffect(() => {
    const search = pathname.split('/').includes('search');
    if (search) onSelect('search');
  }, [pathname]);

  // 🐞[Bug]: layoutId Bug Issue Link : https://github.com/framer/motion/issues/1580

  return (
    <S.Nav variants={S.menuVariants} initial="top" animate={menuAnimation}>
      <S.Col>
        <S.Logo href={`${publicUrlStr()}`}>
          <img src={`${publicUrlStr()}/assets/svg/netflix_logo.svg`} alt="netflix logo" />
        </S.Logo>
        <S.List>
          {menus.map((menu) => (
            <S.Item className={selected === menu.name ? 'select' : ''} key={menu.name} onClick={() => onSelect(menu.name)}>
              <Link to={`${publicUrlStr()}${menu.path}`}>{menu.nicName}</Link>
              {selected === menu.name ? <S.Line layoutId="circle" /> : null}
            </S.Item>
          ))}
        </S.List>
      </S.Col>
      <S.Col>
        <SearchBox />
        <S.ProfileBox layoutId={profileData.id ? '' : 'profile'}>
          <img src={profileData.background_path} alt="user profile icon" />
        </S.ProfileBox>
      </S.Col>
    </S.Nav>
  );
}

export default Header;

// [ useAnimation() ]
// - 코드를 통해 요소들을 제어할 때 요소들에게 동시에 애니메이션 효과를주기 위해 사용하는 방법이다.
// - 애니메이션 효과를 조건에 따라 동적으로 효과를 변경할 수 있다.

// -> https://www.framer.com/docs/animation/#component-animation-controls
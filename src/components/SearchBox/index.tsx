import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimation } from "framer-motion";
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { publicUrlStr } from '../../utils';
import * as S from './style';

interface IForm {
  keyword: string;
}

function SearchBox() {
  const [searchState, setSearchState] = useState(false);
  const dropSearchRef = useRef<HTMLFormElement | null>(null);
  const iconAnimation = useAnimation();
  const inputAnimation = useAnimation();
  const history = useHistory();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { register, handleSubmit } = useForm<IForm>();

  const onValid = (search: IForm) => {
    history.push(`${publicUrlStr()}/search?keyword=${search.keyword}`);
  }
  
  const toggleSearch = useCallback(() => {
    if (searchState) {
      iconAnimation.start(S.iconShowAnimation);
      inputAnimation.start(S.searchCloseAnimation);
    }
    else {
      iconAnimation.start(S.iconHiddenAnimation);
      inputAnimation.start(S.searchOpenAnimation);
    }
    setSearchState(prev => !prev);
  }, [searchState, iconAnimation, inputAnimation]);

  useEffect(() => {
    const searchClose = (e: { target: any }) => {
      if (!keyword && searchState && !dropSearchRef.current?.contains(e.target)) toggleSearch();
    }
    document.addEventListener('click', searchClose);
    return () => document.removeEventListener('click', searchClose);
  }, [keyword, searchState, toggleSearch])

  return (
    <S.Form ref={dropSearchRef} onSubmit={handleSubmit(onValid)}>
      <S.OutIcon initial={{ opacity: 1 }} animate={iconAnimation} onClick={toggleSearch}>
        <img src={`${publicUrlStr()}/assets/svg/search.svg`} alt="search icon"/>
      </S.OutIcon>
      <S.Wrapper initial={{ scaleX: 0 }} animate={inputAnimation}>
        <S.InnerIcon>
          <img src={`${publicUrlStr()}/assets/svg/search.svg`} alt="search icon"/>
        </S.InnerIcon>
        <S.Input
          {...register("keyword", { required: true })}
          placeholder="title, movie, series..."
          autoComplete='off'/>
      </S.Wrapper>
    </S.Form>
  )
}

export default SearchBox;


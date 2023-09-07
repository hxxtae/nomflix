import { useAnimation } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { publicUrlStr } from '../../utils';
import * as S from './style';

interface IForm {
  keyword: string;
}

function Search() {
  const [searchState, setSearchState] = useState(false);
  const dropSearchRef = useRef<HTMLFormElement | null>(null);
  const inputAnimation = useAnimation();
  const history = useHistory();
  const { register, handleSubmit } = useForm<IForm>();

  const onValid = (search: IForm) => {
    history.push(`${publicUrlStr()}/search?keyword=${search.keyword}`);
  }
  
  const toggleSearch = useCallback(() => {
    if (searchState)
      inputAnimation.start(S.searchCloseAnimation);
    else
      inputAnimation.start(S.searchOpenAnimation);
    setSearchState(prev => !prev);
  }, [searchState, inputAnimation]);

  useEffect(() => {
    const searchClose = (e: {target: any}) => {
      if (searchState && !dropSearchRef.current?.contains(e.target)) 
        toggleSearch();
    }
    document.addEventListener('click', searchClose);
    return () => document.removeEventListener('click', searchClose);
  }, [searchState, toggleSearch])

  return (
    <S.Box ref={dropSearchRef} onSubmit={handleSubmit(onValid)}>
      <S.OutIcon onClick={toggleSearch} animate={S.searchIconAnimation(searchState)}>
        <img src={`${publicUrlStr()}/assets/svg/search.svg`} alt="search icon"/>
      </S.OutIcon>
      <S.Wrapper initial={{ scaleX: 0 }} animate={inputAnimation}>
        <S.InnerIcon>
          <img src={`${publicUrlStr()}/assets/svg/search.svg`} alt="search icon"/>
        </S.InnerIcon>
        <S.Input
          {...register("keyword", { required: true })}
          placeholder="Search for movie & tv show"
          autoComplete='off'
        />
      </S.Wrapper>
      
    </S.Box>
  )
}

export default Search;


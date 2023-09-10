import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';

import { api, query } from '../../apis';
import { formatImagePath } from '../../utils';
import { MovieCategory, queryKey } from '../../constants';
import { SliderContent, Loading } from '../../components';
import { useState } from 'react';
import * as S from './style';

function Movies() {
  console.log('Home');
  const { isLoading: nowPlayLoading, datas: nowPlayDatas } = query.useDataFetch(queryKey.movie.nowPlaying(), api.getNowPlayAll);
  const { isLoading: popularLoading, datas: popularDatas } = query.useDataFetch(queryKey.movie.popular(), api.getPopularAll);
  const { isLoading: topLoading, datas: topDatas } = query.useDataFetch(queryKey.movie.top(), api.getTopAll);
  const { isLoading: upcomingLoading, datas: upcomingDatas } = query.useDataFetch(queryKey.movie.upcoming(), api.getUpcomingAll);
  const [clicksSlider, setClickSlider] = useState(0);

  const onClick = (slideNum: number) => {
    setClickSlider(slideNum);
  };

  return (
    <S.Wrapper>
      { nowPlayLoading ?
        <Loading /> : !!nowPlayDatas ? 
        <>
          <S.Banner bgphoto={formatImagePath(nowPlayDatas ? nowPlayDatas[0].backdrop_path : "")}>
            <S.Title>{ nowPlayDatas ? nowPlayDatas[0].title : "" }</S.Title>
            <S.ButtonWrapper>
              <S.BannerButton>
                <FontAwesomeIcon icon={faPlay} /><span>재생</span>
              </S.BannerButton>
              <S.BannerButton>
                <FontAwesomeIcon icon={faPlus} /><span>내가 찜한 콘텐츠</span>
              </S.BannerButton>
            </S.ButtonWrapper>
            <S.Overview>{ nowPlayDatas ? nowPlayDatas[0].overview : "" }</S.Overview>
          </S.Banner>
          <S.SliderWrapper onClick={() => onClick(MovieCategory.NowPlaying)}>
            <S.SliderTitle>지금 뜨는 콘텐츠</S.SliderTitle>
            <SliderContent key={MovieCategory.NowPlaying} data={ nowPlayDatas } kind={MovieCategory.NowPlaying} slider={clicksSlider} />
          </S.SliderWrapper>
        </> : <Loading /> }
      { popularLoading ? 
        <Loading /> : !!popularDatas ? 
        <S.SliderWrapper onClick={() => onClick(MovieCategory.Popular)}>
          <S.SliderTitle>인기 상승 콘텐츠</S.SliderTitle>
          <SliderContent key={MovieCategory.Popular} data={ popularDatas } kind={MovieCategory.Popular} slider={clicksSlider} />
        </S.SliderWrapper> : <Loading /> }
      { topLoading ? 
        <Loading /> : !!topDatas ? 
        <S.SliderWrapper onClick={() => onClick(MovieCategory.Top)}>
          <S.SliderTitle>베스트 인기 콘텐츠</S.SliderTitle>
          <SliderContent key={MovieCategory.Top} data={ topDatas } kind={MovieCategory.Top} slider={clicksSlider} />
        </S.SliderWrapper> : <Loading /> }
      { upcomingLoading ? 
        <Loading /> : !!upcomingDatas ?
        <S.SliderWrapper onClick={() => onClick(MovieCategory.Upcoming)}>
          <S.SliderTitle>개봉 예정작 콘텐츠</S.SliderTitle>
          <SliderContent key={MovieCategory.Upcoming} data={ upcomingDatas } kind={MovieCategory.Upcoming} slider={clicksSlider} />
        </S.SliderWrapper> : <Loading /> }
    </S.Wrapper>
  );
}

export default Movies;

// [ AnimatePresence ]
// 컴포넌트가 render되거나 destroy 될 때 효과를 줄 수 있다.

// ( props )
// 1. initial: boolean
// 2. custom: any
// 3. exitBeforeEnter: boolean
// 4. onExitComplete: void

// [ Gestures ]
// variants로 인해 whileHover 같은 props는 자동적으로 자식 element에게 상속된다.
// (단 해당 variants의 속성의 initial 이름이나 animate(GesturesEvent)의 이름은 부모의 variants안의 속성 이름과 같아야 한다.)

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Loading, SliderContent } from '../../components';
import { queryKey, TvCategory } from '../../constants';
import { formatImagePath } from '../../utils';
import { query, api } from '../../apis';
import { useState } from 'react';
import * as S from './style';

function Tv() {
  // console.log('Tv');
  const { isLoading: onAirLoading, datas: onAirDatas } = query.useContentFetch(queryKey.tv.onAir(), api.getTvOnAirAll);
  const { isLoading: popularLoading, datas: popularDatas } = query.useContentFetch(queryKey.tv.popular(), api.getTvPopularAll);
  const { isLoading: topLoading, datas: topDatas } = query.useContentFetch(queryKey.tv.top(), api.getTvTopAll);
  const { isLoading: airingTodayLoading, datas: airingTodayDatas } = query.useContentFetch(queryKey.tv.airingToday(), api.getTvAiringTodayAll);
  const [clicksSlider, setClickSlider] = useState(0);

  const onClick = (slideNum: number) => {
    setClickSlider(slideNum);
  };

  return (
    <S.Wrapper>
      { onAirLoading ? 
        <Loading/> : !!onAirDatas ?
        <>
          <S.Banner bgphoto={formatImagePath(onAirDatas ? onAirDatas[0].backdrop_path : "")}>
            <S.Title>{onAirDatas ? onAirDatas[0].name : ""}</S.Title>
            <S.ButtonWrapper>
              <S.BannerButton>
                <FontAwesomeIcon icon={faPlay} /><span>재생</span>
              </S.BannerButton>
              <S.BannerButton>
                <FontAwesomeIcon icon={faPlus} /><span>상세 정보</span>
              </S.BannerButton>
            </S.ButtonWrapper>
            <S.Overview>{ onAirDatas ? onAirDatas[0].overview : "" }</S.Overview>
          </S.Banner>
          <S.SliderWrapper onClick={() => onClick(TvCategory.OnAir)}>
            <S.SliderTitle>현재 방영중인 시리즈</S.SliderTitle>
            <SliderContent key={TvCategory.OnAir} data={ onAirDatas } kind={TvCategory.OnAir} slider={clicksSlider} />
          </S.SliderWrapper>
          </> : <Loading />}
      {popularLoading ? <Loading/> :
        !!popularDatas ? 
        <S.SliderWrapper onClick={() => onClick(TvCategory.Popular)}>
          <S.SliderTitle>인기 상승 시리즈</S.SliderTitle>
          <SliderContent key={TvCategory.Popular} data={ popularDatas } kind={TvCategory.Popular} slider={clicksSlider} />
          </S.SliderWrapper> : <Loading />}
      {topLoading ? <Loading/> :
        !!topDatas ? 
        <S.SliderWrapper onClick={() => onClick(TvCategory.Top)}>
          <S.SliderTitle>베스트 인기 시리즈</S.SliderTitle>
          <SliderContent key={TvCategory.Top} data={ topDatas } kind={TvCategory.Top} slider={clicksSlider} />
          </S.SliderWrapper> : <Loading />}
      {airingTodayLoading ? <Loading/> :
        !!airingTodayDatas ? 
        <S.SliderWrapper onClick={() => onClick(TvCategory.AiringToday)}>
          <S.SliderTitle>오늘 관심도 높은 시리즈</S.SliderTitle>
          <SliderContent key={TvCategory.AiringToday} data={ airingTodayDatas } kind={TvCategory.AiringToday} slider={clicksSlider} />
          </S.SliderWrapper> : <Loading />}
    </S.Wrapper>
  );
}

export default Tv;

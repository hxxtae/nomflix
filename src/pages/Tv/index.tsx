import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';

import { SliderView } from '../../components';
import { queryKey, SliderCategory } from '../../constants';
import { makeImagePath } from '../../utils';
import { query, api } from '../../apis';
import { useState } from 'react';
import * as S from './style';

function Tv() {
  console.log('Tv');
  const [clicksSlider, setClickSlider] = useState(0);
  const { isLoading: onAirLoading, datas: onAirDatas } = query.useDataFetch(queryKey.tv.onAir(), api.getTvOnAirAll);

  const onClick = (slideNum: number) => {
    setClickSlider(slideNum);
  };

  return (
    <S.Wrapper>
      { onAirLoading ? (
        <S.Loader>Loading...</S.Loader>) :
        (<>
          <S.Banner bgphoto={makeImagePath(onAirDatas ? onAirDatas[0].backdrop_path : "")}>
            <S.Title>{onAirDatas ? onAirDatas[0].name : ""}</S.Title>
            <S.ButtonWrapper>
              <S.BannerButton>
                <FontAwesomeIcon icon={faPlay} /><span>재생</span>
              </S.BannerButton>
              <S.BannerButton>
                <FontAwesomeIcon icon={faPlus} /><span>내가 찜한 콘텐츠</span>
              </S.BannerButton>
            </S.ButtonWrapper>
            <S.Overview>{ onAirDatas ? onAirDatas[0].overview : "" }</S.Overview>
          </S.Banner>
          <S.SliderWrapper onClick={() => onClick(SliderCategory.onAir)}>
            <S.SliderTitle>현재 방영중인 시리즈</S.SliderTitle>
            <SliderView data={ onAirDatas } kind={SliderCategory.onAir} slider={clicksSlider} />
          </S.SliderWrapper>
        </>)}
    </S.Wrapper>
  );
}

export default Tv;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Loading, SliderContent } from '../../components';
import { queryKey, TvCategory } from '../../constants';
import { formatImagePath } from '../../utils';
import { query, api } from '../../apis';
import { useState } from 'react';
import * as S from './style';

function Tv() {
  console.log('Tv');
  const { isLoading: onAirLoading, datas: onAirDatas } = query.useDataFetch(queryKey.tv.onAir(), api.getTvOnAirAll);
  const [clicksSlider, setClickSlider] = useState(0);

  const onClick = (slideNum: number) => {
    setClickSlider(slideNum);
  };

  return (
    <S.Wrapper>
      { onAirLoading ? 
        <Loading/> : !!onAirDatas ?
        (<>
          <S.Banner bgphoto={formatImagePath(onAirDatas ? onAirDatas[0].backdrop_path : "")}>
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
          <S.SliderWrapper onClick={() => onClick(TvCategory.OnAir)}>
            <S.SliderTitle>현재 방영중인 시리즈</S.SliderTitle>
            <SliderContent key={TvCategory.OnAir} data={ onAirDatas } kind={TvCategory.OnAir} slider={clicksSlider} />
          </S.SliderWrapper>
        </>) : <Loading/>}
    </S.Wrapper>
  );
}

export default Tv;

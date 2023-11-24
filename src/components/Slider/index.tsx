import { memo, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { MovieCategory, TvCategory } from '../../constants';
import { atomOfContentData } from '../../global';
import { useContentFetch } from '../../hooks';
import { SkeletonList } from '../../components';
import { dto } from '../../apis';
import * as S from './style';
import SliderContent from './SliderContent';

interface ISlider {
  kind: MovieCategory | TvCategory;
  title: string;
  getSlider: number;
  setSliderKind: (sliderNum: number) => void;
  queryKey: () => readonly string[];
  queryFn: Function;
}

const setFetchDataLength = (datas: dto.IContentData[], kind: number) => {
  if (kind === 18 || kind === 28) return datas.slice(0, 10); // 데이터 개수 10개로 제한
  return datas;
}

function Slider({ kind, title, getSlider, setSliderKind, queryKey, queryFn }: ISlider) {
  // console.log('Slider: ' + kind)
  const { isLoading, datas } = useContentFetch(queryKey(), queryFn);
  const setBannerData = useSetRecoilState(atomOfContentData);

  useEffect(() => {
    if (kind !== MovieCategory.NowPlaying && kind !== TvCategory.OnAir) return;
    if (!datas?.length) return;

    setBannerData((prevData) => ({
      ...prevData,
      ...datas[0],
    }))
  }, [kind, datas, setBannerData]);

  return (
    <S.SliderWrapper className={'slider' + kind} onClick={() => setSliderKind(kind)} >
      <S.SliderTitle>{title}</S.SliderTitle>
      {isLoading ? <SkeletonList height={162} /> :
        !!datas ? <SliderContent
          data={setFetchDataLength(datas, kind)}
          kind={kind}
          slider={getSlider}
        /> : <SkeletonList height={162} />}
    </S.SliderWrapper>
  )
  
}

export default memo(Slider);

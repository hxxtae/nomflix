import { useState, useCallback } from 'react';

import { Banner, Slider } from '../../components';
import { queryKey, TvCategory } from '../../constants';
import { api } from '../../apis';
import * as S from './style';

function Tv() {
  const [clicksSlider, setClickSlider] = useState(0);

  const setSliderKind = useCallback((sliderNum: number) => {
    setClickSlider(sliderNum);
  }, []);

  const getQueryFunction = useCallback((kind: number) => {
    if (kind === TvCategory.OnAir) return api.getTvOnAirAll;
    if (kind === TvCategory.Popular) return api.getTvPopularAll;
    if (kind === TvCategory.Top) return api.getTvTopAll;
    return api.getTvAiringTodayAll;
  }, []);

  const getQueryKey = useCallback((kind: number) => {
    if (kind === TvCategory.OnAir) return queryKey.tv.onAir;
    if (kind === TvCategory.Popular) return queryKey.tv.popular;
    if (kind === TvCategory.Top) return queryKey.tv.top;
    return queryKey.tv.airingToday;
  }, []);

  return (
    <S.Wrapper>
      <Banner kind={TvCategory.OnAir} />
      <Slider
        key={TvCategory.OnAir}
        kind={TvCategory.OnAir}
        title='현재 방영중인 시리즈'
        getSlider={clicksSlider === TvCategory.OnAir ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(TvCategory.OnAir)}
        queryFn={getQueryFunction(TvCategory.OnAir)}
      />
      <Slider
        key={TvCategory.Popular}
        kind={TvCategory.Popular}
        title='인기 상승 시리즈'
        getSlider={clicksSlider === TvCategory.Popular ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(TvCategory.Popular)}
        queryFn={getQueryFunction(TvCategory.Popular)}
      />
      <Slider
        key={TvCategory.Top}
        kind={TvCategory.Top}
        title='베스트 인기 시리즈'
        getSlider={clicksSlider === TvCategory.Top ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(TvCategory.Top)}
        queryFn={getQueryFunction(TvCategory.Top)}
      />
      <Slider
        key={TvCategory.AiringToday}
        kind={TvCategory.AiringToday}
        title='오늘 관심도 높은 시리즈'
        getSlider={clicksSlider === TvCategory.AiringToday ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(TvCategory.AiringToday)}
        queryFn={getQueryFunction(TvCategory.AiringToday)}
      />
    </S.Wrapper>
  );
}

export default Tv;

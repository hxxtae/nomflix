import { useState, useCallback, useEffect } from 'react';

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
    if (kind === TvCategory.Ranking) return api.getTvPopularAll;
    return api.getTvAiringTodayAll;
  }, []);

  const getQueryKey = useCallback((kind: number) => {
    if (kind === TvCategory.OnAir) return queryKey.tv.onAir;
    if (kind === TvCategory.Popular) return queryKey.tv.popular;
    if (kind === TvCategory.Top) return queryKey.tv.top;
    if (kind === TvCategory.Ranking) return queryKey.tv.popular;
    return queryKey.tv.airingToday;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <S.Wrapper>
      <Banner kind={TvCategory.Tv} />
      <Slider
        key={TvCategory.OnAir}
        kind={TvCategory.OnAir}
        title='Series Currently Airing'
        getSlider={clicksSlider === TvCategory.OnAir ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(TvCategory.OnAir)}
        queryFn={getQueryFunction(TvCategory.OnAir)}
      />
      <Slider
        key={TvCategory.Ranking}
        kind={TvCategory.Ranking}
        title='Top 10 Series in Today'
        getSlider={clicksSlider === TvCategory.Ranking ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(TvCategory.Ranking)}
        queryFn={getQueryFunction(TvCategory.Ranking)}
      />
      <Slider
        key={TvCategory.Top}
        kind={TvCategory.Top}
        title='Highly Rated Series'
        getSlider={clicksSlider === TvCategory.Top ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(TvCategory.Top)}
        queryFn={getQueryFunction(TvCategory.Top)}
      />
      <Slider
        key={TvCategory.Popular}
        kind={TvCategory.Popular}
        title='Rising Popular Series'
        getSlider={clicksSlider === TvCategory.Popular ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(TvCategory.Popular)}
        queryFn={getQueryFunction(TvCategory.Popular)}
      />
      <Slider
        key={TvCategory.AiringToday}
        kind={TvCategory.AiringToday}
        title='Series Airing Today'
        getSlider={clicksSlider === TvCategory.AiringToday ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(TvCategory.AiringToday)}
        queryFn={getQueryFunction(TvCategory.AiringToday)}
      />
    </S.Wrapper>
  );
}

export default Tv;

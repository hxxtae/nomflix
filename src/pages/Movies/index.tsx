import { useState, useCallback, useEffect } from 'react';

import { Banner, Slider } from '../../components';
import { queryKey, MovieCategory } from '../../constants';
import { api } from '../../apis';
import * as S from './style';

function Movies() {
  const [clicksSlider, setClickSlider] = useState(0);

  const setSliderKind = useCallback((sliderNum: number) => {
    setClickSlider(sliderNum);
  }, []);

  const getQueryFunction = useCallback((kind: number) => {
    if (kind === MovieCategory.NowPlaying) return api.getNowPlayAll;
    if (kind === MovieCategory.Popular) return api.getPopularAll;
    if (kind === MovieCategory.Top) return api.getTopAll;
    return api.getUpcomingAll;
  }, []);

  const getQueryKey = useCallback((kind: number) => {
    if (kind === MovieCategory.NowPlaying) return queryKey.movie.nowPlaying;
    if (kind === MovieCategory.Popular) return queryKey.movie.popular;
    if (kind === MovieCategory.Top) return queryKey.movie.top;
    return queryKey.movie.upcoming;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <S.Wrapper>
      <Banner kind={MovieCategory.NowPlaying} />
      <Slider
        key={MovieCategory.NowPlaying}
        kind={MovieCategory.NowPlaying}
        title='Now Currently Showing Contents'
        getSlider={clicksSlider === MovieCategory.NowPlaying ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(MovieCategory.NowPlaying)}
        queryFn={getQueryFunction(MovieCategory.NowPlaying)}
      />
      <Slider
        key={MovieCategory.Popular}
        kind={MovieCategory.Popular}
        title='Rising Popular Contents'
        getSlider={clicksSlider === MovieCategory.Popular ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(MovieCategory.Popular)}
        queryFn={getQueryFunction(MovieCategory.Popular)}
      />
      <Slider
        key={MovieCategory.Top}
        kind={MovieCategory.Top}
        title='Highly Rated Contents'
        getSlider={clicksSlider === MovieCategory.Top ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(MovieCategory.Top)}
        queryFn={getQueryFunction(MovieCategory.Top)}
      />
      
      <Slider
        key={MovieCategory.Upcoming}
        kind={MovieCategory.Upcoming}
        title='Upcoming Release Contents'
        getSlider={clicksSlider === MovieCategory.Upcoming ? clicksSlider : 0}
        setSliderKind={setSliderKind}
        queryKey={getQueryKey(MovieCategory.Upcoming)}
        queryFn={getQueryFunction(MovieCategory.Upcoming)}
      />
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

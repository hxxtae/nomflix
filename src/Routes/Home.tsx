import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getNowPlayAll, getPopularAll, getTopAll, getUpcoming, getUpcomingAll, IGetDataResult } from '../api/api';
import { makeImagePath } from '../utils';
import SliderView from '../components/SliderView';
import { SliderCategory } from '../constants/constants';
import Loading from '../components/Loading';
import { useMemo } from 'react';

const Wrapper = styled.div`
  
`;
const Banner = styled.div<{bgphoto: string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 60px;
  background-image: linear-gradient(rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${(props) => props.bgphoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  font-weight: bold;
  margin-bottom: 40px;

  &::selection {
    background-color: transparent;
  }
`;
const Overview = styled.p`
  font-size: 40px;
  width: 60%;
  letter-spacing: .8px;
  line-height: 50px;
  &::selection {
    background-color: transparent;
  }
`;
const SliderWrapper = styled.div`
  
`;
const SliderTitle = styled.h2`
  display: block;
  font-size: 30px;
  font-weight: bold;
  transform: translateY(-120px);
  margin-left: 60px;  
`;


function Home() {
  console.log('Home');

  // 서버 데이터 캐싱
  const { isLoading: nowPlayLoading, data: nowplayingData } = useQuery<IGetDataResult[]>(["movie", "nowPlaying"], () => getNowPlayAll());
  const nowPlayDatas = nowPlayLoading ?
    [] : nowplayingData ?
      [ ...nowplayingData[0].results,
        ...nowplayingData[1].results,
        ...nowplayingData[2].results ] : [];

  const { isLoading: popularLoading, data: popularData } = useQuery<IGetDataResult[]>(["movies", "popular"], () => getPopularAll());
  const popularDatas = popularLoading ?
    [] : popularData ?
      [...popularData[0].results,
        ...popularData[1].results,
        ...popularData[2].results] : [];

  const { isLoading: topLoading, data: topData } = useQuery<IGetDataResult[]>(["movies", "top"], () => getTopAll());
  const topDatas = topLoading ?
    [] : topData ?
      [...topData[0].results,
        ...topData[1].results,
        ...topData[2].results] : [];

  const { isLoading: upcomingLoading, data: upcomingData } = useQuery<IGetDataResult[]>(["movies", "upcoming"], () => getUpcomingAll());
  const upcomingDatas = upcomingLoading ?
    [] : upcomingData ?
      [...upcomingData[0].results,
        ...upcomingData[1].results,
        ...upcomingData[2].results] : [];

  return (
    <Wrapper>
      { nowPlayLoading ?
        <Loading /> :
        <>
          <Banner bgphoto={makeImagePath(nowPlayDatas[0].backdrop_path)}>
            <Title>{ nowPlayDatas[0].title }</Title>
            <Overview>{ nowPlayDatas[0].overview }</Overview>
          </Banner>
          <SliderWrapper>
            <SliderTitle>지금 뜨는 콘텐츠</SliderTitle>
            <SliderView data={ nowPlayDatas } kind={SliderCategory.NowPlaying} />
          </SliderWrapper>
        </>}
      { popularLoading ? 
        <Loading /> : 
        <SliderWrapper>
          <SliderTitle>인기 상승 콘텐츠</SliderTitle>
          <SliderView data={ popularDatas } kind={SliderCategory.Popular} />
        </SliderWrapper> }
      { topLoading ? 
        <Loading /> : 
        <SliderWrapper>
          <SliderTitle>베스트 인기 콘텐츠</SliderTitle>
          <SliderView data={ topDatas } kind={SliderCategory.Top} />
        </SliderWrapper> }
      { upcomingLoading ? 
        <Loading /> : 
        <SliderWrapper>
          <SliderTitle>개봉 예정작 콘텐츠</SliderTitle>
          <SliderView data={ upcomingDatas } kind={SliderCategory.Upcoming} />
        </SliderWrapper> }
    </Wrapper>
  );
}

export default Home;


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

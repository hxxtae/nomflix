import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import { api, query } from '../apis';
import { makeImagePath } from '../utils';
import { SliderCategory, queryKey } from '../constants';
import { SliderView, Loading } from '../components';
import { useState } from 'react';

function Home() {
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
    <Wrapper>
      { nowPlayLoading ?
        <Loading /> :
        <>
          <Banner bgphoto={makeImagePath(nowPlayDatas ? nowPlayDatas[0].backdrop_path : "")}>
            <Title>{ nowPlayDatas ? nowPlayDatas[0].title : "" }</Title>
            <ButtonWrapper>
              <BannerButton>
                <FontAwesomeIcon icon={faPlay} /><span>재생</span>
              </BannerButton>
              <BannerButton>
                <FontAwesomeIcon icon={faPlus} /><span>내가 찜한 콘텐츠</span>
              </BannerButton>
            </ButtonWrapper>
            <Overview>{ nowPlayDatas ? nowPlayDatas[0].overview : "" }</Overview>
          </Banner>
          <SliderWrapper onClick={() => onClick(SliderCategory.NowPlaying)}>
            <SliderTitle>지금 뜨는 콘텐츠</SliderTitle>
            <SliderView data={ nowPlayDatas } kind={SliderCategory.NowPlaying} slider={clicksSlider} />
          </SliderWrapper>
        </>}
      { popularLoading ? 
        <Loading /> : 
        <SliderWrapper onClick={() => onClick(SliderCategory.Popular)}>
          <SliderTitle>인기 상승 콘텐츠</SliderTitle>
          <SliderView data={ popularDatas } kind={SliderCategory.Popular} slider={clicksSlider} />
        </SliderWrapper> }
      { topLoading ? 
        <Loading /> : 
        <SliderWrapper onClick={() => onClick(SliderCategory.Top)}>
          <SliderTitle>베스트 인기 콘텐츠</SliderTitle>
          <SliderView data={ topDatas } kind={SliderCategory.Top} slider={clicksSlider} />
        </SliderWrapper> }
      { upcomingLoading ? 
        <Loading /> : 
        <SliderWrapper onClick={() => onClick(SliderCategory.Upcoming)}>
          <SliderTitle>개봉 예정작 콘텐츠</SliderTitle>
          <SliderView data={ upcomingDatas } kind={SliderCategory.Upcoming} slider={clicksSlider} />
        </SliderWrapper> }
    </Wrapper>
  );
}

export default Home;

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
`;

const BannerButton= styled.button`
  border-radius: 5px;
  border: none;
  padding: 0 50px;
  background-color: rgba(0, 0, 0, .4);
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-right: 20px;
  transition: box-shadow 200ms ease-in-out;

  span {
    display: inline-block;
    padding: 14px 0 14px 10px;
  }

  :last-child {
    margin-right: 0;
  }

  :hover {
    background-color: #e7e7e7;
    color: #000000;
    box-shadow: 0 10px 20px 0 #000000;
  }
`;

const Overview = styled.p`
  font-size: 25px;
  width: 40%;
  letter-spacing: .8px;
  line-height: 50px;
  /* _line-clamp */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: default;
  
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

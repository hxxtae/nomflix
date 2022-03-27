import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, getPopular, getTop, getUpcoming, IGetDataResult } from '../api';
import { makeImagePath } from '../utils';
import SliderView from '../components/SliderView';
import { SliderCategory } from '../constants';

const Wrapper = styled.div`
  
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 70px 0;
  box-shadow: 0 -10px 50px rgba(255, 255, 255, 1);
`;
const FooterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  padding-top: 20px;

  i {
    font-size: 20px;

    &:first-child {
      margin-right: 50px;
    }
  }

  img {
    width: 30px;
    height: 100%;
  }
`;

function Home() {
  console.log('Home');

  // 서버 데이터 캐싱
  const { isLoading: loadingN1, data: nowplayingData1 } = useQuery<IGetDataResult>(["movies", "nowPlaying1"], () => getMovies(1));
  const { isLoading: loadingN2, data: nowplayingData2 } = useQuery<IGetDataResult>(["movies", "nowPlaying2"], () => getMovies(2));
  const { isLoading: loadingN3, data: nowplayingData3 } = useQuery<IGetDataResult>(["movies", "nowPlaying3"], () => getMovies(3));
  const nowPlayLoading = loadingN1 || loadingN2 || loadingN3;

  const nowPlayDataFunc = () => {
    const arr1 = loadingN1 ? [] : nowplayingData1 ? nowplayingData1.results : [];
    const arr2 = loadingN2 ? [] : nowplayingData2 ? nowplayingData2.results : [];
    const arr3 = loadingN3 ? [] : nowplayingData3 ? nowplayingData3.results : [];
    return [...arr1, ...arr2, ...arr3];
  };

  const { isLoading: loadingP1, data: populData1 } = useQuery<IGetDataResult>(["movies", "popular1"], () => getPopular(1));
  const { isLoading: loadingP2, data: populData2 } = useQuery<IGetDataResult>(["movies", "popular2"], () => getPopular(2));
  const { isLoading: loadingP3, data: populData3 } = useQuery<IGetDataResult>(["movies", "popular3"], () => getPopular(3));
  const popularLoading = loadingP1 || loadingP2 || loadingP3;

  const popularDataFunc = () => {
    const arr1 = loadingP1 ? [] : populData1 ? populData1.results : [];
    const arr2 = loadingP2 ? [] : populData2 ? populData2.results : [];
    const arr3 = loadingP3 ? [] : populData3 ? populData3.results : [];
    return [...arr1, ...arr2, ...arr3];
  };

  const { isLoading: loadingT1, data: topData1 } = useQuery<IGetDataResult>(["movies", "top1"], () => getTop(1));
  const { isLoading: loadingT2, data: topData2 } = useQuery<IGetDataResult>(["movies", "top2"], () => getTop(2));
  const { isLoading: loadingT3, data: topData3 } = useQuery<IGetDataResult>(["movies", "top3"], () => getTop(3));
  const topLoading = loadingT1 || loadingT2 || loadingT3;

  const topDataFunc = () => {
    const arr1 = loadingT1 ? [] : topData1 ? topData1.results : [];
    const arr2 = loadingT2 ? [] : topData2 ? topData2.results : [];
    const arr3 = loadingT3 ? [] : topData3 ? topData3.results : [];
    return [...arr1, ...arr2, ...arr3];
  };


  const { isLoading: loadingU1, data: upcomingData1 } = useQuery<IGetDataResult>(["movies", "upcoming1"], () => getUpcoming(1));
  const { isLoading: loadingU2, data: upcomingData2 } = useQuery<IGetDataResult>(["movies", "upcoming2"], () => getUpcoming(2));
  const { isLoading: loadingU3, data: upcomingData3 } = useQuery<IGetDataResult>(["movies", "upcoming3"], () => getUpcoming(3));
  const upcomingLoading = loadingU1 || loadingU2 || loadingU3;

  const upcomingDataFunc = () => {
    const arr1 = loadingU1 ? [] : upcomingData1 ? upcomingData1.results : [];
    const arr2 = loadingU2 ? [] : upcomingData2 ? upcomingData2.results : [];
    const arr3 = loadingU3 ? [] : upcomingData3 ? upcomingData3.results : [];
    return [...arr1, ...arr2, ...arr3];
  };


  return (
    <>
      <Wrapper>
        { nowPlayLoading ? (
          <Loader>Loading...</Loader>) :
          (<>
            <Banner
              bgphoto={makeImagePath(nowPlayDataFunc()[0].backdrop_path || "")}
            >
              <Title>{ nowPlayDataFunc()[0].title }</Title>
              <Overview>{ nowPlayDataFunc()[0].overview }</Overview>
            </Banner>
            <SliderWrapper>
              <SliderTitle>지금 뜨는 콘텐츠</SliderTitle>
              <SliderView data={ nowPlayDataFunc() } kind={SliderCategory.NowPlaying} />
            </SliderWrapper>
          </>)}
        { popularLoading ? (
          <Loader>Loading...</Loader>) : 
          ( <SliderWrapper>
              <SliderTitle>인기 상승 콘텐츠</SliderTitle>
              <SliderView data={ popularDataFunc() } kind={SliderCategory.Popular} />
            </SliderWrapper> 
          )}
        { topLoading ? (
          <Loader>Loading...</Loader>) : 
          ( <SliderWrapper>
              <SliderTitle>베스트 인기 콘텐츠</SliderTitle>
              <SliderView data={ topDataFunc() } kind={SliderCategory.Top} />
            </SliderWrapper> 
          )}
        { upcomingLoading ? (
          <Loader>Loading...</Loader>) : 
          ( <SliderWrapper>
              <SliderTitle>개봉 예정작 콘텐츠</SliderTitle>
              <SliderView data={ upcomingDataFunc() } kind={SliderCategory.Upcoming} />
            </SliderWrapper> 
          )}
      </Wrapper>
      <FooterWrapper>
        <div>
          <span>© 2022 - Kim Hee Tae & ReactMasterClass in NomardCode.</span>
        </div>
        <FooterBox>
          <a href="https://github.com/hxxtae" target="_blank" title="깃 허브" className="sc-bqiRlB gThtPW">
            <i className="fab fa-github"></i>
          </a>
          <a title="노마드코더" href="https://nomadcoders.co/" target="_blank" className="sc-bqiRlB gThtPW">
            <img src="https://nomadcoders.co/m.svg" alt="" aria-labelledby="노마드코더" aria-required="true" className="sc-ksdxgE cDENRo" />
          </a>
        </FooterBox>
      </FooterWrapper>
    </>
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

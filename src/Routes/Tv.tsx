import { useQuery } from 'react-query';
import { getTvOntheAir, IGetDataResult } from '../api';
import styled from 'styled-components';
import SliderView from '../components/SliderView';
import { SliderCategory } from '../constants';
import { makeImagePath } from '../utils';

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

function Tv() {
  console.log('Tv');

  const { isLoading: loadingAir1, data: onAirData1 } = useQuery<IGetDataResult>(["Tv", "onTheAir1"], () => getTvOntheAir(1));
  const { isLoading: loadingAir2, data: onAirData2 } = useQuery<IGetDataResult>(["Tv", "onTheAir2"], () => getTvOntheAir(2));
  const { isLoading: loadingAir3, data: onAirData3 } = useQuery<IGetDataResult>(["Tv", "onTheAir3"], () => getTvOntheAir(3));
  const loadingAir = loadingAir1 || loadingAir2 || loadingAir3;

  const onAirDataFunc = () => {
    const arr1 = loadingAir1 ? [] : onAirData1 ? onAirData1.results : [];
    const arr2 = loadingAir2 ? [] : onAirData2 ? onAirData2.results : [];
    const arr3 = loadingAir3 ? [] : onAirData3 ? onAirData3.results : [];
    return [...arr1, ...arr2, ...arr3];
  };

  return (
    <Wrapper>
      { loadingAir ? (
        <Loader>Loading...</Loader>) :
        (<>
          <Banner
            bgphoto={makeImagePath(onAirDataFunc()[0].backdrop_path || "")}
          >
            <Title>{ onAirDataFunc()[0].name }</Title>
            <Overview>{ onAirDataFunc()[0].overview }</Overview>
          </Banner>
          <SliderWrapper>
            <SliderTitle>현재 방영중인 시리즈</SliderTitle>
            <SliderView data={ onAirDataFunc() } kind={SliderCategory.NowPlaying} />
          </SliderWrapper>
        </>)}
    </Wrapper>
  );
}

export default Tv;

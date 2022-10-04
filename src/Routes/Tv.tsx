import styled from 'styled-components';

import { SliderView } from '../components';
import { SliderCategory } from '../constants';
import { makeImagePath } from '../utils';
import { query, api } from '../apis';

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

  const { isLoading: onAirLoading, datas: onAirDatas } = query.useDataFetch(["Tv", "onAir"], api.getTvOnAirAll);

  return (
    <Wrapper>
      { onAirLoading ? (
        <Loader>Loading...</Loader>) :
        (<>
          <Banner
            bgphoto={makeImagePath(onAirDatas ? onAirDatas[0].backdrop_path : "")}
          >
            <Title>{ onAirDatas ? onAirDatas[0].name : "" }</Title>
            <Overview>{ onAirDatas ? onAirDatas[0].overview : "" }</Overview>
          </Banner>
          <SliderWrapper>
            <SliderTitle>현재 방영중인 시리즈</SliderTitle>
            <SliderView data={ onAirDatas } kind={SliderCategory.onAir} />
          </SliderWrapper>
        </>)}
    </Wrapper>
  );
}

export default Tv;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import { SliderView } from '../components';
import { queryKey, SliderCategory } from '../constants';
import { makeImagePath } from '../utils';
import { query, api } from '../apis';
import { useState } from 'react';

function Tv() {
  console.log('Tv');

  const [clicksSlider, setClickSlider] = useState(0);
  const { isLoading: onAirLoading, datas: onAirDatas } = query.useDataFetch(queryKey.tv.onAir(), api.getTvOnAirAll);

  const onClick = (slideNum: number) => {
    setClickSlider(slideNum);
  };

  return (
    <Wrapper>
      { onAirLoading ? (
        <Loader>Loading...</Loader>) :
        (<>
          <Banner bgphoto={makeImagePath(onAirDatas ? onAirDatas[0].backdrop_path : "")}>
            <Title>{onAirDatas ? onAirDatas[0].name : ""}</Title>
            <ButtonWrapper>
              <BannerButton>
                <FontAwesomeIcon icon={faPlay} /><span>재생</span>
              </BannerButton>
              <BannerButton>
                <FontAwesomeIcon icon={faPlus} /><span>내가 찜한 콘텐츠</span>
              </BannerButton>
            </ButtonWrapper>
            <Overview>{ onAirDatas ? onAirDatas[0].overview : "" }</Overview>
          </Banner>
          <SliderWrapper onClick={() => onClick(SliderCategory.onAir)}>
            <SliderTitle>현재 방영중인 시리즈</SliderTitle>
            <SliderView data={ onAirDatas } kind={SliderCategory.onAir} slider={clicksSlider} />
          </SliderWrapper>
        </>)}
    </Wrapper>
  );
}

export default Tv;

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

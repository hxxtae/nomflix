import styled from 'styled-components';
import { media } from '../../../utils';

const TOP_DISTANCE = 80;

export const Content = styled.div<{ videoShow: boolean }>`
  position: relative;
  top: -${TOP_DISTANCE}px;
  padding: 0 50px;
  transition: transform 1s ease-in-out;
  transform: ${({ videoShow }) => (videoShow ? `translateY(${TOP_DISTANCE}px);` : 'translateY(0);')};
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.textColor};
  padding: 20px 0px;
  font-size: 46px;
  line-height: 1.4;
`;

export const VoteYearGenre = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  width: 100%;
  line-height: 1.1rem;
  font-weight: 600;

  ${media('mobile')} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    
  }

  strong {
    color: #46d369;
  }

  span {
    color: ${({ theme }) => theme.thirdColor};
  }

  p {
    color: ${({ theme }) => theme.textColor};
  }
`;

export const Overview = styled.div`
  padding: 20px 0px;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.12rem;
  line-height: 30px;
  margin-bottom: 60px;
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.textColor};
  padding: 20px 0px;
  margin-bottom: 20px;
  font-size: 26px;
  line-height: 1.4;
`;

export const ImageBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 60px;

  img {
    border-radius: 7px;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
  
  ${media('mobile')} {
    img {
      max-width: 150px;
      width: 100%;
    }
  }
`;

export const InfoBox = styled.ul`
  margin-bottom: 30px;
`;

export const Info = styled.li`
  margin-bottom: 8px;
  line-height: 1.3;

  strong {
    color: ${({ theme }) => theme.thirdColor};
  }

  span {
    margin-bottom: 20px;
  }
`;
import styled from 'styled-components';
import { media } from '../../../utils';

export const Content = styled.div`
  position: relative;
  top: -80px;
  padding: 0 50px;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.textColor};
  padding: 20px 0px;
  font-size: 46px;
`;

export const Overview = styled.div`
  padding: 20px 0px;
  color: ${({ theme }) => theme.textColor};
  letter-spacing: 1px;
  line-height: 30px;
  margin-bottom: 60px;
`;

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.textColor};
  padding: 20px 0px;
  margin-bottom: 20px;
  font-size: 26px;
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
  }
  
  ${media('mobile')} {
    img {
      max-width: 150px;
      width: 100%;
    }
  }
`;

export const Info = styled.div`
  margin-bottom: 8px;
  line-height: 1.3em;

  strong {
    color: ${({ theme }) => theme.thirdColor};
  }

  span {
    margin-bottom: 20px;
  }

  span:after {
    content: ', '
  }

  span:last-child:after {
    content: ''
  }
`;
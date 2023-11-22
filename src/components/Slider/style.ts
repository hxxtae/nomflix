import styled from 'styled-components';
import { media } from '../../utils';

export const SliderWrapper = styled.div`
  transform: translateY(-120px);
  margin-bottom: 100px;

  ${media('mobile')} {
    margin-bottom: 30px;
  }
`;

export const SliderTitle = styled.h2`
  display: block;
  font-size: 30px;
  font-weight: bold;
  margin-left: 60px;
  margin-bottom: 20px;

  ${media('tablet')} {
    font-size: 25px;
  }

  ${media('mobile')} {
    font-size: 20px;
    margin-left: 35px;
  }
`;

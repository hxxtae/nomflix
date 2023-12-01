import styled from 'styled-components';
import { media } from '../../../utils';

export const Title = styled.h2`
  display: block;
  font-size: 30px;
  font-weight: bold;
  
  &:nth-of-type(1) {
    padding-top: 50px;
  }
`;

export const List = styled.ul`
  padding: 50px 0px;
  display: grid;
  gap: 4vw 0.4vw;
  grid-template-columns: repeat(6, 1fr);

  ${media('tablet')} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${media('mobile')} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
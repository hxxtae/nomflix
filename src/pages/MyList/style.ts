import styled from 'styled-components';

import { HEADER_HEIGHT } from '../../global';
import { media } from '../../utils';

export const Wrapper = styled.div`
  padding-top: ${HEADER_HEIGHT}px;
  margin: 0px 4% 10px;
  min-height: 100vh;
`;

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
    grid-template-columns: repeat(5, 1fr);
  }

  ${media('mobile')} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
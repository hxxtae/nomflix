import styled from 'styled-components';

import { media } from '../../../utils';

export const Section = styled.section`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgColor};

  ${media('mobile')} {
    font-size: 10px;
  }
`;

export const Wrapper = styled.div`
  padding: 0 20px;
  margin-bottom: 10%;
`;

export const GuideContent = styled.p`
  margin-bottom: 20px;
`;

export const Content = styled.ul`
  padding-left: 40px;
  margin: 20px 0;
  line-height: 1.2;
  
  li {
    list-style: disc;
  }
`;

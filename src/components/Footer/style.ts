import styled from 'styled-components';
import { media } from '../../utils';

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 70px 0;
  box-shadow: 0 -10px 50px rgba(255, 255, 255, 1);

  ${media('mobile')} {
    font-size: .8rem;
  }
`;
export const FooterText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${media('mobile')} {
    flex-direction: column;
  }
`;
export const FooterBox = styled.div`
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
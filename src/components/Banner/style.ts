import styled from 'styled-components';
import { media } from '../../utils';

export const Banner = styled.div<{ bgphoto: string }>`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 60px;
  background-image: linear-gradient(rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${(props) => props.bgphoto});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${media('mobile')} {
    padding: 20px;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  bottom: 30%;
  width: 40%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  ${media('mobile')} {
    width: 70%;
  }
`;

export const Title = styled.h2`
  font-size: 3.2vw;
  font-weight: bold;
  margin-bottom: 30px;

  &::selection {
    background-color: transparent;
  }

  ${media('mobile')} {
    font-size: 26px;
  }
`;

export const Overview = styled.p`
  font-size: 1.2vw;
  margin-bottom: 40px;
  letter-spacing: .8px;
  line-height: 1.5;
  /* _line-clamp */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: default;

  &::selection {
    background-color: transparent;
  }

  ${media('mobile')} {
    font-size: 12px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const BannerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 2.7em;
  padding: 0 50px;
  border-radius: 5px;
  border: none;
  margin-right: 20px;
  background-color: rgba(0, 0, 0, .4);
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  transition: box-shadow 200ms ease-in-out;
  cursor: pointer;

  :last-child {
    margin-right: 0;
  }

  :hover {
    background-color: #e7e7e7;
    color: #000000;
    box-shadow: 0 10px 20px 0 #000000;
  }

  ${media('tablet')} {
    font-size: 14px;
    padding: 0 20px;
  }

  ${media('mobile')} {
    gap: 10px;
  }
`;

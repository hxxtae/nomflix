import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyled = createGlobalStyle`
  ${reset};

  @font-face {
    font-family: "Vazirmatn", sans-serif;
    src: url("https://fonts.googleapis.com/css2?family=Vazirmatn&display=swap");
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Vazirmatn";
    color: ${(props) => props.theme.textColor};
    overflow-x: hidden;
    background-color: rgba(20, 20, 20, 1);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;


export const LAYOUT_Z_INDEX = {
  header: 10,
  profile: 11,
  splash: 12,
}
export const HEADER_HEIGHT = 70;
export const DETAILVIEW_IMAGE_SIZE_PC = 450;
export const DETAILVIEW_IMAGE_SIZE_MB = 350;
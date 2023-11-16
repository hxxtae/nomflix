import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyled = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }

  body {
    color: ${(props) => props.theme.textColor};
    overflow-x: hidden;
    background-color: rgba(20, 20, 20, 1);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const HEADER_HEIGHT = 70;
export const DETAILVIEW_IMAGE_SIZE_PC = 450;
export const DETAILVIEW_IMAGE_SIZE_MB = 350;
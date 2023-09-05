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

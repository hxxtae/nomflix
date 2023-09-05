import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { reset } from 'styled-reset';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom';

import { darkTheme } from './constants';
import App from './App';

const GlobalStyled = createGlobalStyle`
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

const client = new QueryClient();

ReactDOM.render(
  <>
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={client}>
        <RecoilRoot>
          <GlobalStyled />
          <App />
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  </>,
  document.getElementById('root')
);

console.log('Website by %c https://hxxtae.me ', `
  font-size: 14px; 
  line-height: 44px;
  color: #e7e7e7;
  background-color: #000000`
);

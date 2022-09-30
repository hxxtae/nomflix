import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';
import { reset } from 'styled-reset';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

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
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={client}>
        <RecoilRoot>
          <GlobalStyled />
          <App />
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

console.log('Website by %c https://hxxtae.me ', `
  font-size: 14px; 
  line-height: 44px;
  color: #e7e7e7;
  background-color: #000000`
);

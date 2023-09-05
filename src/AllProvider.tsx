import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ReactElement } from 'react';

import { darkTheme } from './constants';
import { GlobalStyled } from './global';

const client = new QueryClient();

interface IAllProvider {
  children: ReactElement;
}

function AllProvider({ children }: IAllProvider) {
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={client}>
        <RecoilRoot>
          <GlobalStyled />
          {children}
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default AllProvider;

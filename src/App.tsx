import { BrowserRouter } from 'react-router-dom';

import { Header, Footer, withSplashScreen } from './components';
import RouterSwitch from './router';

function App() {
  // console.log('App');
  
  return (
    <BrowserRouter>
      <Header />
      <RouterSwitch />
      <Footer />
    </BrowserRouter>
  );
}

export default withSplashScreen(App);

// NOTE: Refactoring
// - /movies/:movieId 는 Home 컴포넌트에서 중첩 라우터로 따로 지정해 주어야 한다.
// - /tv/:tvId 도 마찮 가지
// -> nomfliex 클론 코딩 에서, 중첩 라우터를 쓰지 않으면 불필요한 렌더링을 동작시키기 때문이다.

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { publicUrlStr } from './utils'
import Header from './components/Header';
import Movies from './pages/Movies';
import Tv from './pages/Tv';
import Search from './pages/Search';
import Footer from './components/Footer';

function App() {
  console.log('App');
  
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path={[`${publicUrlStr()}`, `${publicUrlStr()}/movies`, `${publicUrlStr()}/movies/:movieId`]}>
          <Movies />
        </Route>
        <Route exact path={[`${publicUrlStr()}/tv`, `${publicUrlStr()}/tv/:tvId`]}>
          <Tv />
        </Route>
        <Route exact path={`${publicUrlStr()}/search`}>
          <Search />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

// NOTE: Refactoring
// - /movies/:movieId 는 Home 컴포넌트에서 중첩 라우터로 따로 지정해 주어야 한다.
// - /tv/:tvId 도 마찮 가지
// -> nomfliex 클론 코딩 에서, 중첩 라우터를 쓰지 않으면 불필요한 렌더링을 동작시키기 때문이다.

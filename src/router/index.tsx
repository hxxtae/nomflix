import { Route, Switch } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { Loading } from '../components';
import { publicUrlStr } from '../utils';
import * as S from './style';

const Movies = lazy(() => import('../pages/Movies'));
const Tv = lazy(() => import('../pages/Tv'));
const MyList = lazy(() => import('../pages/MyList'));
const Search = lazy(() => import('../pages/Search'));

function RouterSwitch() {
  return (
    <S.Wrapper>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={[`${publicUrlStr()}`, `${publicUrlStr()}/movies`, `${publicUrlStr()}/movies/:movieId`]}>
            <Movies />
          </Route>
          <Route exact path={[`${publicUrlStr()}/tv`, `${publicUrlStr()}/tv/:tvId`]}>
            <Tv />
          </Route>
          <Route exact path={`${publicUrlStr()}/mylist`}>
            <MyList />
          </Route>
          <Route exact path={`${publicUrlStr()}/search`}>
            <Search />
          </Route>
        </Switch>
      </Suspense>
    </S.Wrapper>
  )
}

export default RouterSwitch;
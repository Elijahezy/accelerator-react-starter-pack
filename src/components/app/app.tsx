import { Router, Route, Switch } from 'react-router';

import { createBrowserHistory } from 'history';
import { Suspense } from 'react';
import { lazy } from 'react';
import { AppRoute } from '../consts/app';
import NotFoundScreen from '../notfoundscreen/not-found-screen';
import Cart from '../cart/cart';
import LoadingSpinner from "../loading-spinner/loading-spinner";
const MainPage = lazy(() => import('../main/main'));
const ProductMain = lazy(() => import('../product/product'));
const browserHistory = createBrowserHistory();

function App(): JSX.Element {
  return (
    <Router history={browserHistory}>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch >
          <Route exact path={AppRoute.Main}>
            <MainPage />
          </Route>
          <Route exact path={AppRoute.Guitar}>
            <ProductMain />
          </Route>
          <Route exact path={AppRoute.Cart}>
            <Cart />
          </Route>
          <Route>
            <NotFoundScreen />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;

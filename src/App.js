import React from 'react';
import './App.css';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { routeHome, routeAdmin } from './routes';
import HomeTemplate from './templates/home-template';
import AdminTemplate from './templates/admin-template';
import Admin from './pages/admin/admin';
import PageNotFound from './page-not-found';
import WarningModal from './components/modals/warning-modal';

const showMenuHome = routes => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <HomeTemplate key={index} path={item.path} exact={item.exact} Component={item.component} />
      )
    });
  };
}

const showMenuAdmin = routes => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <AdminTemplate key={index} path={item.path} exact={item.exact} Component={item.component} />
      )
    });
  };
}

function App() {

  // useEffect(() => {
  //   // TODO: check token from localStorage
  //   // true -> do nothing
  //   // false -> delete token localStorage + redirect page to admin / 404 / Unauthorized

  // }, [input])

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {showMenuHome(routeHome)}
          {showMenuAdmin(routeAdmin)}
          <Route path="/admin" component={Admin} />
          <Route path="" component={PageNotFound} />
          <WarningModal />
        </Switch>
      </div>
    </BrowserRouter >
  );
}

export default App;

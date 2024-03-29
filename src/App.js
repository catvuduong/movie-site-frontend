import React from 'react';
import './App.css';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { routeHome, routeAdmin } from './routes';
import HomeTemplate from './templates/home-template';
import AdminTemplate from './templates/admin-template';
import Admin from './pages/admin/admin';
import PageNotFound from './page-not-found';


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
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {showMenuHome(routeHome)}
          {showMenuAdmin(routeAdmin)}
          <Route path="/admin" component={Admin} />
          <Route path="" component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter >
  );
}

export default App;

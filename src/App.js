import './App.css';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { routeHome } from './routes';
import HomeTemplate from './templates/home-template';
import pageNotFound from './pageNotFound';

const showMenuHome = routes => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <HomeTemplate key={index} path={item.path} exact={item.exact} Component={item.component} />
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
          <Route path="" component={pageNotFound} />
        </Switch>
      </div>
    </BrowserRouter >
  );
}

export default App;

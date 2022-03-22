import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/esm/popper.min.js';
import 'jquery/dist/jquery.min.js';
// import 'jquery/dist/jquery.slim.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'swiper/css/swiper.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import './css/dash-board.css';
import "./css/simple-sidebar.css";

// page not found lib
import './css/page-not-found-lib.css';
//animation warning modal
import './css/modal-animation.css'

import './config/interceptors';

import './css/main.css';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers/root-reducer';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/app';

ReactDOM.render(
  <Router>
    <Route component={App} path={['/', '/:day']} exact/>
  </Router>,
  document.getElementById('root')
);

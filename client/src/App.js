import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import store from './store';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ImagePage from './component/ImagePage';
import Header from './component/Header';
import UploadPage from './component/UploadPage';
import Menu from './component/Menu';
import DifferencePage from './component/DifferencesPage';

import 'milligram/dist/milligram.min.css';
import './App.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Provider store={ store }>
          <div className='container'>
            <Header />
            <Menu/>
            <Switch>
              <Route exact path='/' component={ ImagePage }/>
              <Route exact path='/upload' component= { UploadPage } />
              <Route exact path='/differences' component={ DifferencePage } />
            </Switch>
          </div>
        </Provider>
      </HashRouter>
    );
  }
}

export default observer(App);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Navigation from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import Store from './src/redux/store/Store';

export default class App extends Component {

  render() {
    return (
      <Provider store={Store()}>
        <Navigation />
      </Provider>
    );
  }
}

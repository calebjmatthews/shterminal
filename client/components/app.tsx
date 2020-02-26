import React, { Component } from 'react';

import ThreadWindow from './thread_window';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';

export default class App extends Component {
  props: AppProps;

  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="body-container">
          <Sidebar />
          <ThreadWindow />
        </div>
        <Footer />
      </div>
    );
  }
}

interface AppProps {
}

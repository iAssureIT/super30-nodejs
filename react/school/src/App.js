import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/header/Header.js'
import MiddleContent from './component/middlecontent/MiddleContent.js'
import Sidebar from './component/sidebar/Sidebar.js'
import Footer1 from './component/footer/Footer1.js'
import Footer2 from './component/footer/Footer2.js'

import Layout from './component/Layout/Layout.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';

function App() {
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;

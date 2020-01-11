import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header     from './components/Header/Header.js';
import MainContent from './components/MainContent/MainContent.js';
import Sidebar    from './components/Sidebar/Sidebar.js';
import Footer1    from './components/Footer/Footer1.js';
import Footer2    from './components/Footer/Footer2.js';


function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Sidebar />
      <Footer1 />
      <Footer2 />
    </div>
  );
}

export default App;

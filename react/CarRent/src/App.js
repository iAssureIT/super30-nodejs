import React from 'react';

import Layout from './common/Layouts/Layout.js';

import './App.css';
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'jquery-validation';


function App() {
  return (
    <div className="App container-fluid">
        <Layout />
    </div>
  );
}

export default App;

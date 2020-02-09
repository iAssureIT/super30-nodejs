import React from 'react';

import Layout from './common/Layouts/Layout.js';

import './App.css';
import 'jquery/src/jquery.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'jquery-validation';
// import $ from 'jquery';

console.log("process.env.REACT_APP_ACCESSKEYID = ", process.env.REACT_APP_ACCESSKEYID);
console.log("process.env.REACT_APP_SECRETACCESSKEY = ", process.env.REACT_APP_SECRETACCESSKEY);


function App() {
  return (
    <div className="App container-fluid">
        <Layout />
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let app = <App />;
ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import "./index.css";
// import "./items.scss";
import { CssBaseline, Router, NavBar} from "./component";
import {persistor, store} from "./config/store";
import {LoadingView} from "./component/LoadingView";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<LoadingView/>} persistor={persistor}>
            <CssBaseline />
            <Router>
                <App />
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
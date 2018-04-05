import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {HashRouter as Router} from 'react-router-dom';
import {createStore,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './redux/reducer';

const store = createStore(reducer, compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,   
    document.getElementById('root')
)




import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import * as serviceWorker from './serviceWorker';
// import {createStore} from 'redux';
import {Provider} from 'react-redux';

// import rootReducer from './Services/Reducers/index'
// const store = createStore(rootReducer)

import { store } from './app/store';
const root = ReactDOM.createRoot(document.getElementById('root'))

// console.table(store)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>,
    </React.StrictMode>
  
);


// serviceWorker.unr egister();
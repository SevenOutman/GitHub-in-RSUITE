import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux-immutable';
import routing from './modules/routing';

const middlewares = [thunkMiddleware];

/**
 * Enable Redux devtools browser extension
 * @see https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    routing
  }),
  composeEnhancers(applyMiddleware(...middlewares))
);


export default store;
// store.js
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducer from './reducers/reducer';

const store = createStore(
  postsReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;

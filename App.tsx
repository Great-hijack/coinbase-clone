import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import watchlistReducer from './src/store/reducers/watchlist';
import topMoversReducer from './src/store/reducers/topmovers';
import newsReducer from './src/store/reducers/news';
import assetsReducer from './src/store/reducers/assets';
import historyReducer from './src/store/reducers/history';
import AppNavigator from './src/navigation/AppNavigator';

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
  topMovers: topMoversReducer,
  news: newsReducer,
  assets: assetsReducer,
  history: historyReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

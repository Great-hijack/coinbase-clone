import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import watchlistReducer from './src/store/reducers/watchlist';
import topMoversReducer from './src/store/reducers/topmovers';
import newsReducer from './src/store/reducers/news';
import assetsReducer from './src/store/reducers/assets';
import historyReducer from './src/store/reducers/history';
import coinHistoryReducer from './src/store/reducers/coinhistory';
import balancehistoryReducer from './src/store/reducers/balancehistory';
import userReducer from './src/store/reducers/user';
import AppNavigator from './src/navigation/AppNavigator';
import {persistConfig} from './src/store/store';

const rootReducer = combineReducers({
  watchlist: persistReducer(persistConfig, watchlistReducer),
  topMovers: persistReducer(persistConfig, topMoversReducer),
  news: persistReducer(persistConfig, newsReducer),
  assets: persistReducer(persistConfig, assetsReducer),
  history: persistReducer(persistConfig, historyReducer),
  coinhistory: persistReducer(persistConfig, coinHistoryReducer),
  balanceHistory: persistReducer(persistConfig, balancehistoryReducer),
  user: persistReducer(persistConfig, userReducer),
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

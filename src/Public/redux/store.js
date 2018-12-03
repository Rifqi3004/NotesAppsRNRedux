import {  createStore } from 'redux'
import reducers from "./reducers/index"
import { AsyncStorage } from 'react-native';
import midlewares from "./middleware"
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
  }
const persistedReducer = persistReducer(persistConfig, reducers)  

    export const store = createStore(persistedReducer,midlewares)
   export const persistor = persistStore(store)

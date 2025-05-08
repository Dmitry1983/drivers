import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import listSlice from './listSlice';
import driverSlice from './driverSlice';

export * from './driverSlice';
export * from './listSlice';

const rootReducer = combineReducers({
  list: listSlice.reducer,
  driver: driverSlice.reducer,
});

// persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['list', 'driver'], // сохраняем только нужные поля
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import filterReducer from './filter/filter-reducers';
import { contactsApi } from 'redux/contacts/contacts-api';

const rootReducer = combineReducers({
  [contactsApi.reducerPath]: contactsApi.reducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

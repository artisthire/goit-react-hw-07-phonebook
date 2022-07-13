import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contactReducer from 'redux/contacts/contacts-reducers';

const rootReducer = combineReducers({ contacts: contactReducer });

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

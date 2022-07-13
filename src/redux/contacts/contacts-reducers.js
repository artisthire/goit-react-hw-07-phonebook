import { nanoid } from 'nanoid';
import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as actions from 'redux/contacts/contacts-actions';

const INITIAL_CONTACTS = [
  { id: nanoid(6), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(6), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(6), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(6), name: 'Annie Copeland', number: '227-91-26' },
];

const contactsReducer = createReducer(INITIAL_CONTACTS, builder => {
  builder
    .addCase(actions.addContact, (state, { payload }) => {
      state.push(payload);
    })
    .addCase(actions.removeContact, (state, { payload }) => {
      const removeItemIndex = state.findIndex(
        contact => contact.id === payload
      );
      state.splice(removeItemIndex, 1);
    });
});

const filterReducer = createReducer('', builder => {
  builder.addCase(actions.changeFilter, (_, { payload }) => payload);
});

const contactReducer = combineReducers({
  items: contactsReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: 'contacts',
  version: 1,
  storage,
  blacklist: ['filter'],
};

const persistedContactReducer = persistReducer(persistConfig, contactReducer);

export default persistedContactReducer;

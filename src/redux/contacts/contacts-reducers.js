import { createReducer, combineReducers } from '@reduxjs/toolkit';
import * as actions from 'redux/contacts/contacts-actions';

const contactsReducer = createReducer([], {
  [actions.getContactsSuccess]: (_, { payload }) => payload,
  [actions.addContactSuccess]: (state, { payload }) => {
    state.push(payload);
  },
  [actions.removeContactSuccess]: (state, { payload }) => {
    const removeItemIndex = state.findIndex(contact => contact.id === payload);
    state.splice(removeItemIndex, 1);
  },
});

const filterReducer = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

const isLoadingReducer = createReducer(
  { getContacts: false, addContact: false, removeContact: false },
  {
    [actions.getContactsRequest]: state => {
      state.getContacts = true;
    },
    [actions.getContactsSuccess]: state => {
      state.getContacts = false;
    },
    [actions.getContactsError]: state => {
      state.getContacts = false;
    },
    [actions.addContactRequest]: state => {
      state.addContact = true;
    },
    [actions.addContactSuccess]: state => {
      state.addContact = false;
    },
    [actions.addContactError]: state => {
      state.addContact = false;
    },
    [actions.removeContactRequest]: state => {
      state.removeContact = true;
    },
    [actions.removeContactSuccess]: state => {
      state.removeContact = false;
    },
    [actions.removeContactError]: state => {
      state.removeContact = false;
    },
  }
);

const errorReducer = createReducer(
  { getContacts: '', addContact: '', removeContact: '' },
  {
    [actions.getContactsError]: (state, { payload }) => {
      state.getContacts = payload;
    },
    [actions.addContactError]: (state, { payload }) => {
      state.addContact = payload;
    },
    [actions.removeContactError]: (state, { payload }) => {
      state.removeContact = payload;
    },
  }
);

const contactReducer = combineReducers({
  items: contactsReducer,
  filter: filterReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
});

export default contactReducer;

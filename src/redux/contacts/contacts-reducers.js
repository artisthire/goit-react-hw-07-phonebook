import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { changeFilter } from 'redux/contacts/contacts-actions';
import {
  getContacts,
  addContact,
  removeContact,
} from 'redux/contacts/contacts-operations';

const contactsReducer = createReducer([], {
  [getContacts.fulfilled]: (_, { payload }) => payload,
  [addContact.fulfilled]: (state, { payload }) => {
    state.push(payload);
  },
  [removeContact.fulfilled]: (state, { payload }) => {
    const removeItemIndex = state.findIndex(contact => contact.id === payload);
    state.splice(removeItemIndex, 1);
  },
});

const filterReducer = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const isLoadingReducer = createReducer(
  { getContacts: false, addContact: false, removeContact: false },
  {
    [getContacts.pending]: state => {
      state.getContacts = true;
    },
    [getContacts.fulfilled]: state => {
      state.getContacts = false;
    },
    [getContacts.rejected]: state => {
      state.getContacts = false;
    },
    [addContact.pending]: state => {
      state.addContact = true;
    },
    [addContact.fulfilled]: state => {
      state.addContact = false;
    },
    [addContact.rejected]: state => {
      state.addContact = false;
    },
    [removeContact.pending]: state => {
      state.removeContact = true;
    },
    [removeContact.fulfilled]: state => {
      state.removeContact = false;
    },
    [removeContact.rejected]: state => {
      state.removeContact = false;
    },
  }
);

const errorReducer = createReducer(
  { getContacts: '', addContact: '', removeContact: '' },
  {
    [getContacts.rejected]: (state, { payload }) => {
      state.getContacts = payload;
    },
    [addContact.rejected]: (state, { payload }) => {
      state.addContact = payload;
    },
    [removeContact.rejected]: (state, { payload }) => {
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

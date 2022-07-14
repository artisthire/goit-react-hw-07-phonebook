import { createAction } from '@reduxjs/toolkit';

const changeFilter = createAction('contact/changeFilter');

const getContacts = createAction('contact/getContacts');
const getContactsRequest = createAction('contact/getContactsRequest');
const getContactsSuccess = createAction('contact/getContactsSucces');
const getContactsError = createAction('contact/getContactsError');

const addContactRequest = createAction('contact/addContactRequest');
const addContactSuccess = createAction('contact/addContactSucces');
const addContactError = createAction('contact/addContactError');

const removeContactRequest = createAction('contact/removeContactRequest');
const removeContactSuccess = createAction('contact/removeContactSucces');
const removeContactError = createAction('contact/removeContactError');

export {
  changeFilter,
  getContacts,
  getContactsRequest,
  getContactsSuccess,
  getContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  removeContactRequest,
  removeContactSuccess,
  removeContactError,
};

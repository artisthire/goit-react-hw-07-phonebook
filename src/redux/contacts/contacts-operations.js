import axios from 'axios';
import * as actions from './contacts-actions';

const axiosInst = axios.create({
  baseURL: 'https://62ce8647486b6ce82646ca75.mockapi.io',
});

const getContacts = () => async dispatch => {
  dispatch(actions.getContactsRequest());

  try {
    const { data: contacts } = await axiosInst.get(`/contacts`);
    dispatch(actions.getContactsSuccess(contacts));
  } catch (err) {
    dispatch(actions.getContactsError(err.message));
  }
};

const addContact = payload => async dispatch => {
  dispatch(actions.addContactRequest());

  try {
    const { data: contact } = await axiosInst.post(`/contacts`, payload);
    dispatch(actions.addContactSuccess(contact));
  } catch (err) {
    dispatch(actions.addContactError(err.message));
  }
};

const removeContact = id => async dispatch => {
  dispatch(actions.removeContactRequest());

  try {
    const { data: removedContact } = await axiosInst.delete(`/contacts/${id}`);
    dispatch(actions.removeContactSuccess(removedContact.id));
  } catch (err) {
    dispatch(actions.removeContactError(err.message));
  }
};

export { getContacts, addContact, removeContact };

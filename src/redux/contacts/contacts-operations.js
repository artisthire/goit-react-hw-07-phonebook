import * as actions from './contacts-actions';

const baseURL = 'https://62ce8647486b6ce82646ca75.mockapi.io';

const getContacts = () => async dispatch => {
  dispatch(actions.getContactsRequest());

  try {
    const resp = await fetch(`${baseURL}/contacts`);

    if (!resp.ok) {
      throw new Error('Network error');
    }

    const contacts = await resp.json();
    dispatch(actions.getContactsSuccess(contacts));
  } catch (err) {
    dispatch(actions.getContactsError(err.message));
  }
};

const addContact = payload => async dispatch => {
  dispatch(actions.addContactRequest());

  try {
    const resp = await fetch(`${baseURL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      throw new Error('Network error');
    }

    const contact = await resp.json();

    dispatch(actions.addContactSuccess(contact));
  } catch (err) {
    dispatch(actions.addContactError(err.message));
  }
};

const removeContact = id => async dispatch => {
  dispatch(actions.removeContactRequest());

  try {
    const resp = await fetch(`${baseURL}/contacts/${id}`, {
      method: 'DELETE',
    });

    if (!resp.ok) {
      throw new Error('Network error');
    }

    dispatch(actions.removeContactSuccess(id));
  } catch (err) {
    dispatch(actions.removeContactError(err.message));
  }
};

export { getContacts, addContact, removeContact };

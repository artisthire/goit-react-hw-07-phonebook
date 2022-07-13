import { nanoid } from 'nanoid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('contact/add', ({ name, number }) => ({
  payload: { id: nanoid(6), name, number },
}));
const removeContact = createAction('contact/remove');
const changeFilter = createAction('contact/changeFilter');

export { addContact, removeContact, changeFilter };

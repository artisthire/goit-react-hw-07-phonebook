import { contactsApi } from 'redux/contacts/contacts-api';

const getCashedContacts = state =>
  contactsApi.endpoints.getContacts.select()(state).data;

export { getCashedContacts };

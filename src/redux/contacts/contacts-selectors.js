const getContacts = state => state.contacts.items;
const getFilterValue = state => state.contacts.filter;

const getIsLoadingContacts = state => state.contacts.isLoading.getContacts;
const getIsAddingContact = state => state.contacts.isLoading.addContact;
const getIsRemovingContact = state => state.contacts.isLoading.removeContact;
const getContactsError = state => state.contacts.error.getContacts;
const addContactError = state => state.contacts.error.addContact;
const removeContactError = state => state.contacts.error.removeContact;

export {
  getContacts,
  getFilterValue,
  getIsLoadingContacts,
  getIsAddingContact,
  getIsRemovingContact,
  getContactsError,
  addContactError,
  removeContactError,
};

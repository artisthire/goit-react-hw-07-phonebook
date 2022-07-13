import { createSelector } from '@reduxjs/toolkit';

const getContacts = state => state.contacts.items;
const getFilterValue = state => state.contacts.filter;

const getVisibleContacts = createSelector(
  getFilterValue,
  getContacts,
  (filterValue, contacts) => {
    const normalizedFilterValue = filterValue.toLowerCase();

    const visibleContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilterValue)
    );

    return visibleContacts;
  }
);

export { getContacts, getVisibleContacts, getFilterValue };

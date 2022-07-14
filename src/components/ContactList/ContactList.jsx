import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  contactsSelectors,
  contactsActions,
  contactsOperations,
} from 'redux/contacts';
import ContactListItem from 'components/ContactList/ContactListItem';
import LoadSpinner from 'components/LoadSpinner';
import { List } from './ContactList.styled';

function ContactList() {
  const contacts = useSelector(contactsSelectors.getContacts);
  const filterValue = useSelector(contactsSelectors.getFilterValue);
  const isLoadingContacts = useSelector(contactsSelectors.getIsLoadingContacts);
  const isRemovingContact = useSelector(contactsSelectors.getIsRemovingContact);
  const loadingContactsError = useSelector(contactsSelectors.getContactsError);
  const removingContactError = useSelector(
    contactsSelectors.removeContactError
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperations.getContacts());
  }, [dispatch]);

  if (!isLoadingContacts && loadingContactsError) {
    toast.error(`Error loading contacts. ${loadingContactsError}`);
  }

  if (!isRemovingContact && removingContactError) {
    toast.error(`Error removing contact. ${removingContactError}`);
  }

  const visibleContacts = useMemo(() => {
    const normalizedFilterValue = filterValue.toLowerCase();

    const visibleContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilterValue)
    );

    return visibleContacts;
  }, [contacts, filterValue]);

  const handleContactRemove = id => {
    dispatch(contactsOperations.removeContact(id));
    dispatch(contactsActions.changeFilter(''));
  };

  return (
    <>
      {!isLoadingContacts && (
        <List>
          {visibleContacts.map(contact => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              onContactRemove={handleContactRemove}
              isRemoving={isRemovingContact}
            />
          ))}
        </List>
      )}
      {isLoadingContacts && <LoadSpinner />}
    </>
  );
}

export default ContactList;

import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { filterActions, filterSelectors } from 'redux/filter';
import {
  useGetContactsQuery,
  useRemoveContactMutation,
} from 'redux/contacts/contacts-api';
import ContactListItem from 'components/ContactList/ContactListItem';
import LoadSpinner from 'components/LoadSpinner';
import { List } from './ContactList.styled';

function ContactList() {
  const filter = useSelector(filterSelectors.getFilter);
  const dispatch = useDispatch();
  const {
    data: contacts = [],
    error: getContactsError,
    isLoading: isLoadingContacts,
  } = useGetContactsQuery();
  const [
    removeContact,
    { isLoading: isRemovingContact, error: errorRemoveContact },
  ] = useRemoveContactMutation();

  if (!isLoadingContacts && getContactsError) {
    const { status, data } = getContactsError;
    toast.error(`Error loading contacts. ${status} ${JSON.stringify(data)}`);
  }

  if (!isRemovingContact && errorRemoveContact) {
    const { status, data } = errorRemoveContact;
    toast.error(`Error removing contact. ${status} ${JSON.stringify(data)}`);
  }

  const visibleContacts = useMemo(() => {
    const normalizedFilterValue = filter.toLowerCase();

    const visibleContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilterValue)
    );

    return visibleContacts;
  }, [contacts, filter]);

  const handleContactRemove = id => {
    dispatch(filterActions.setFilter(''));
    removeContact(id);
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

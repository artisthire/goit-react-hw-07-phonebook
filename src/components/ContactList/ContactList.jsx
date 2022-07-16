import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetContactsQuery,
  useRemoveContactMutation,
} from 'redux/contacts/contacts-api';
import { filterActions, filterSelectors } from 'redux/filter';
import ContactListItem from 'components/ContactList/ContactListItem';
import LoadSpinner from 'components/LoadSpinner';
import { List } from './ContactList.styled';

function ContactList() {
  const filter = useSelector(filterSelectors.getFilter);
  const dispatch = useDispatch();
  const { data: contacts = [], isLoading: isLoadingContacts } =
    useGetContactsQuery();
  const [removeContact, { isLoading: isRemovingContact }] =
    useRemoveContactMutation();

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

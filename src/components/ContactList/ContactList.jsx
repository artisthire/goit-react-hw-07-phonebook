import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/contacts/contacts-api';
import { filterSelectors } from 'redux/filter';
import ContactListItem from 'components/ContactList/ContactListItem';
import LoadSpinner from 'components/LoadSpinner';
import { List } from './ContactList.styled';

function ContactList() {
  const filter = useSelector(filterSelectors.getFilter);
  const { data: contacts = [], isLoading: isLoadingContacts } =
    useGetContactsQuery();
  const visibleContacts = useMemo(() => {
    const normalizedFilterValue = filter.toLowerCase();

    const visibleContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilterValue)
    );

    return visibleContacts;
  }, [contacts, filter]);

  return (
    <>
      {!isLoadingContacts && (
        <List>
          {visibleContacts.map(contact => (
            <ContactListItem key={contact.id} contact={contact} />
          ))}
        </List>
      )}
      {isLoadingContacts && (
        <LoadSpinner
          size={60}
          style={{ display: 'block', margin: '30px auto' }}
        />
      )}
    </>
  );
}

export default ContactList;

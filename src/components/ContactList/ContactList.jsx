import { useSelector } from 'react-redux';
import { getVisibleContacts } from 'redux/contacts/contacts-selectors';
import { List } from './ContactList.styled';
import ContactListItem from 'components/ContactList/ContactListItem';

function ContactList() {
  const visibleContacts = useSelector(getVisibleContacts);

  return (
    <List>
      {visibleContacts.map(contact => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
    </List>
  );
}

export default ContactList;

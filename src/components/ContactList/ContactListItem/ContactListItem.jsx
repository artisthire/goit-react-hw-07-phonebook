import { useDispatch } from 'react-redux';
import { useRemoveContactMutation } from 'redux/contacts/contacts-api';
import { filterActions } from 'redux/filter';
import PropTypes from 'prop-types';
import LoadSpinner from 'components/LoadSpinner';
import { Item, Number, Button } from './ContactListItem.styled';

function ContactListItem({ contact }) {
  const [removeContact, { isLoading: isRemovingContact }] =
    useRemoveContactMutation();
  const dispatch = useDispatch();
  const { name, phone, id } = contact;

  const onContactRemove = id => {
    removeContact(id).finally(() => dispatch(filterActions.setFilter('')));
  };

  return (
    <Item>
      {name}: <Number>{phone}</Number>{' '}
      <Button
        type="button"
        onClick={() => onContactRemove(id)}
        disabled={isRemovingContact}
      >
        {isRemovingContact && <LoadSpinner style={{ marginRight: 5 }} />}
        Delete
      </Button>
    </Item>
  );
}

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactListItem;

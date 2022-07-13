import { useDispatch } from 'react-redux';
import * as actions from 'redux/contacts/contacts-actions';
import PropTypes from 'prop-types';
import { Item, Number, Button } from './ContactListItem.styled';

function ContactListItem({ contact }) {
  const { name, number, id } = contact;
  const dispatch = useDispatch();

  const onContactRemove = () => {
    dispatch(actions.removeContact(id));
    dispatch(actions.changeFilter(''));
  };

  return (
    <Item>
      {name}: <Number>{number}</Number>{' '}
      <Button type="button" onClick={onContactRemove}>
        Delete
      </Button>
    </Item>
  );
}

ContactListItem.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactListItem;

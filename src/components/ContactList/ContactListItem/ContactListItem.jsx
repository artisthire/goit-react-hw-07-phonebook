import PropTypes from 'prop-types';
import { Item, Number, Button } from './ContactListItem.styled';

function ContactListItem({ contact, onContactRemove, isRemoving }) {
  const { name, phone, id } = contact;

  return (
    <Item>
      {name}: <Number>{phone}</Number>{' '}
      <Button
        type="button"
        onClick={() => onContactRemove(id)}
        disabled={isRemoving}
      >
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
  onContactRemove: PropTypes.func.isRequired,
  isRemoving: PropTypes.bool.isRequired,
};

export default ContactListItem;

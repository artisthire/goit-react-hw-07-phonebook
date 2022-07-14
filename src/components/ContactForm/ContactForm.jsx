import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  contactsSelectors,
  contactsActions,
  contactsOperations,
} from 'redux/contacts';
import { Form, Label, LabelName, Input, Button } from './ContactForm.styled';

function ContactForm() {
  const toastIsNameId = useRef(null);
  const contacts = useSelector(contactsSelectors.getContacts);
  const isLoading = useSelector(contactsSelectors.getIsAddingContact);
  const loadingError = useSelector(contactsSelectors.addContactError);
  const dispatch = useDispatch();

  const toastDismiss = () => toast.dismiss(toastIsNameId.current);

  const handleSubmit = evt => {
    evt.preventDefault();
    toastDismiss();

    const form = evt.currentTarget;
    const nameValue = form.name.value.trim();
    const telValue = form.number.value.trim();
    const normalizeName = nameValue.toLocaleLowerCase();
    const isNameInContacts = contacts.some(
      contact => contact.name.toLocaleLowerCase() === normalizeName
    );

    if (isNameInContacts) {
      toastIsNameId.current = toast.warn(
        `"${nameValue}" is already in contacts`
      );
    } else {
      dispatch(
        contactsOperations.addContact({ name: nameValue, phone: telValue })
      );
      dispatch(contactsActions.changeFilter(''));
    }

    form.reset();
  };

  if (!isLoading && loadingError) {
    toast.error(`Error adding contacts. ${loadingError}`);
  }

  return (
    <Form onSubmit={handleSubmit} onClick={toastDismiss}>
      <Label>
        <LabelName>Name</LabelName>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          defaultValue=""
          required
        />
      </Label>
      <Label>
        <LabelName>Phone</LabelName>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          defaultValue=""
          required
        />
      </Label>
      <Button type="submit" disabled={isLoading}>
        Add contact
      </Button>
    </Form>
  );
}

export default ContactForm;

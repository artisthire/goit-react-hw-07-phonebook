import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getContacts } from 'redux/contacts/contacts-selectors';
import { changeFilter, addContact } from 'redux/contacts/contacts-actions';
import { Form, Label, LabelName, Input, Button } from './ContactForm.styled';

function ContactForm() {
  const toastId = useRef(null);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const toastDismiss = () => toast.dismiss(toastId.current);

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
      toastId.current = toast.warn(`"${nameValue}" is already in contacts`);
    } else {
      dispatch(addContact({ name: nameValue, number: telValue }));
      dispatch(changeFilter(''));
    }

    form.reset();
  };

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
      <Button type="submit">Add contact</Button>
    </Form>
  );
}

export default ContactForm;

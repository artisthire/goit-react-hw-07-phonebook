import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getContactsByName } from 'services/contacts-server-api';
import {
  contactsApi,
  useAddContactMutation,
} from 'redux/contacts/contacts-api';
import { getCashedContacts } from 'redux/contacts/contacts-selectors';
import { filterActions } from 'redux/filter';
import { Form, Label, LabelName, Input, Button } from './ContactForm.styled';

function ContactForm() {
  const [isFindingContacts, setFindingContacts] = useState(false);
  const toastIsNameId = useRef(null);
  const cashedContacts = useSelector(getCashedContacts);
  const [addContact, { isLoading: isAddingContact, error: errorAddContact }] =
    useAddContactMutation();
  const dispatch = useDispatch();

  const warningToastDismiss = () => toast.dismiss(toastIsNameId.current);

  const handleSubmit = async evt => {
    evt.preventDefault();
    warningToastDismiss();

    const form = evt.currentTarget;
    const nameValue = form.name.value.trim();
    const telValue = form.number.value.trim();
    const normalizeName = nameValue.toLocaleLowerCase();
    let findedContacts = [];

    try {
      setFindingContacts(true);
      findedContacts = await getContactsByName(nameValue.toLocaleLowerCase());
      setFindingContacts(false);
    } catch (error) {
      toast.warn(`Error adding contact. ${error.message}`);
      setFindingContacts(false);
      return;
    }

    const isNameInContacts =
      findedContacts.length &&
      findedContacts.some(
        contact => contact.name.toLocaleLowerCase() === normalizeName
      );

    if (isNameInContacts) {
      toastIsNameId.current = toast.warn(
        `"${nameValue}" is already in contacts`
      );

      const isNameInVisibleContacts = cashedContacts.some(
        contact => contact.name.toLocaleLowerCase() === normalizeName
      );

      if (!isNameInVisibleContacts) {
        dispatch(
          contactsApi.endpoints.getContacts.initiate(undefined, {
            subscribe: false,
            forceRefetch: true,
          })
        );
      }
    } else {
      addContact({ name: nameValue, phone: telValue });
      dispatch(filterActions.setFilter(''));
      form.reset();
    }
  };

  if (!isAddingContact && errorAddContact) {
    const { status, data } = errorAddContact;
    toast.error(`Error adding contacts. ${status} ${JSON.stringify(data)}`);
  }

  return (
    <Form onSubmit={handleSubmit} onClick={warningToastDismiss}>
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
      <Button type="submit" disabled={isFindingContacts || isAddingContact}>
        Add contact
      </Button>
    </Form>
  );
}

export default ContactForm;

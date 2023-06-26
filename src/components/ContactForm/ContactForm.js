import { useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { selectContacts } from 'components/redux/selectors';
import { Form, Name, Number, Submit, Wrapper } from './ContactForm.styled';
import { useDispatch } from 'react-redux';
import { addContact } from 'components/redux/operators';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const addedContacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const hundleSubmit = evt => {
    evt.preventDefault();

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isContact = isAddedContact(contact);
    if (isContact) {
      return;
    } else {
      dispatch(addContact(contact));
      resetValue();
    }
  };

  const isAddedContact = contact => {
    if (addedContacts.length !== 0) {

      for (const addcontact of addedContacts) {
        if (addcontact.contact.name.includes(contact.name)) {
          alert(`${contact.name} "is already in contacts"`);
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  };

  const handleValue = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const resetValue = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={hundleSubmit}>
        <Wrapper>
          <label>
            Name
            <Name
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={handleValue}
            />
          </label>
          <label>
            Number
            <Number
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={handleValue}
            />
          </label>
        </Wrapper>
        <Submit type="submit">Add contact</Submit>
      </Form>
    </>
  );
}
export default ContactForm;

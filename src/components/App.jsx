import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { Wrapper, PrimaryTittle, SecondTittle } from './App.styled';





export default function App() {

  return (
    <Wrapper>
      <PrimaryTittle>Phonebook</PrimaryTittle>
      <ContactForm  />
    
          <SecondTittle>Contacts</SecondTittle>
          <Filter   />
          <ContactList  />
    </Wrapper>
  );
}

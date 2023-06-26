import { Wrapper, List, Item, WrapperItem, Delete } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { getFilterValue, getContacts, getIsLoading, getError } from '../redux/selectors';
import { useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'components/redux/operators';
import { useEffect } from 'react';


const ContactList = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading)
  const error  = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);


const getVisibleContacts = ()=> {
  if(filterValue === "") {
    return contacts
  }else{
    const normalizeFilter = filterValue.toLowerCase();
    const filterContact = contacts.filter(({ contact }) =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );
  return filterContact
  }

}
  const visibleContacts = getVisibleContacts(filterValue, contacts);

  const hundleDeleteContact = contactId => dispatch(deleteContact(contactId))

  return (
    <div>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      {contacts.length > 0 &&  (
        <Wrapper>
          <List>
            {visibleContacts.map(item => {
              const {name, number} = item.contact
              return (
                <WrapperItem key={item.id}>
                  <Item>
                    {name}: {number}
                  </Item>
                  <Delete
                    type="button"
                    onClick={() => {
                      hundleDeleteContact(item.id);
                    }}
                  >
                    Delete
                  </Delete>
                </WrapperItem>
              );
            })}
          </List>
        </Wrapper>
      )}
    </div>
  );
};
export default ContactList;


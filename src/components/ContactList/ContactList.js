import { Wrapper, List, Item, WrapperItem, Delete } from './ContactList.styled';
import { useSelector } from 'react-redux';
import {
  selectContacts,
  selectIsLoading,
  selectError,
} from '../redux/selectors';
import { selectVisibleContacts } from '../redux/selectors';
import { useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'components/redux/operators';
import { useEffect } from 'react';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const visibleContacts = useSelector(selectVisibleContacts);
  const hundleDeleteContact = contactId => dispatch(deleteContact(contactId));
  return (
    <div>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      {contacts.length > 0 && (
        <Wrapper>
          <List>
            {visibleContacts.map(item => {
              const { name, number } = item.contact;
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

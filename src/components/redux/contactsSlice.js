import { createSlice } from "@reduxjs/toolkit";
import { addContact, fetchContacts, deleteContact  } from "./operators";

const contactsInitialState = {
    contactsItem: [],
    isLoading: false,
    error: null
  }


  const handlePending = state => {
    state.isLoading = true;
  };
  const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  };




const contactSlice = createSlice({
    name: "contacts",
    initialState: contactsInitialState,
//     reducers:{
//     addContact(state, action){
//         state.push(action.payload);
//     },
//     deleteContact(state, action){
//         const index = state.findIndex(task => task.id === action.payload);
//     state.splice(index, 1);
//     },
//       // Виконається в момент старту HTTP-запиту
//     fetchingInProgress(state) {
//         state.isLoading = true;
//     },
//     // Виконається якщо HTTP-запит завершився успішно
//     fetchingSuccess(state, action) {
//         state.isLoading = false;
//         state.error = null;
//         state.items = action.payload;
//     },
//     // Виконається якщо HTTP-запит завершився з помилкою
//     fetchingError(state, action) {
//         state.isLoading = false;
//         state.error = action.payload;
//     },
// }
extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contactsItem = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,


    [deleteContact.pending]: handlePending,
      [deleteContact.fulfilled](state, action) {
        state.isLoading = false;
        state.error = null;
        const index = state.contactsItem.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contactsItem.splice(index, 1);
      },
      [deleteContact.rejected]: handleRejected,


[addContact.pending]: handlePending,
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contactsItem.push(action.payload);
    },
    [addContact.rejected]: handleRejected,
  },
})

// export const {addContact, deleteContact, fetchingInProgress, fetchingSuccess, fetchingError } = contactSlice.actions
export const contactsReducer = contactSlice.reducer




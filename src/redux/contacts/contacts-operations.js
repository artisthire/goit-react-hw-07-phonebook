import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const axiosInst = axios.create({
  baseURL: 'https://62ce8647486b6ce82646ca75.mockapi.io',
});

const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data: contacts } = await axiosInst.get(`/contacts`);
      return contacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addContact = createAsyncThunk(
  'contacts/addContact',
  async (payload, { rejectWithValue }) => {
    try {
      const { data: contact } = await axiosInst.post(`/contacts`, payload);
      return contact;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInst.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { getContacts, addContact, removeContact };

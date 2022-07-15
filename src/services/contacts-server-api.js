import axios from 'axios';

const BASE_URL = 'https://62ce8647486b6ce82646ca75.mockapi.io';

const axiosInst = axios.create({
  baseURL: BASE_URL,
});

const getContactsByName = async name => {
  try {
    const { data } = await axiosInst.get(`/contacts?name=${name}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export { BASE_URL, getContactsByName };

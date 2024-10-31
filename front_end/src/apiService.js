import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchBoardingPlaces = async () => {
  try {
    const response = await api.get('/boarding-places');
    return response.data;
  } catch (error) {
    console.error('Error fetching boarding places:', error);
    throw error;
  }
};

import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to fetch all boarding places
export const fetchBoardingPlaces = async () => {
  try {
    const response = await api.get('/boarding-places');
    return response.data;
  } catch (error) {
    console.error('Error fetching boarding places:', error);
    throw new Error('Unable to fetch boarding places. Please try again later.');
  }
};

// Function to fetch a boarding place by ID
export const fetchBoardingPlaceById = async (id) => {
  try {
    const response = await api.get(`/boarding-places/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching boarding place ${id}:`, error);
    throw new Error(`Unable to fetch boarding place ${id}.`);
  }
};

// Change user password
export const changePassword = async (newPassword) => {
  const token = localStorage.getItem('token'); // Retrieve token
  const response = await api.put('/change-password', { password: newPassword }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Return success message or user data if needed
};

// Fetch user data
export const fetchUserData = async (token, userId) => {
  try {
    const response = await api.get(`/loginuser/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return user data
  } catch (error) {
    console.error('Error fetching user data:', error.response ? error.response.data : error.message);
    throw error; // Propagate the error for further handling
  }
};
// Other functions (create, update, delete) can be added similarly
 
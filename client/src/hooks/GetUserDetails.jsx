import axios from 'axios';

const getUserDetail = async () => {
  try {
    const response = await axios.get('/api/users/current-user-details', {
      withCredentials: true // Make sure cookies are sent with the request
    });

    if (response.status === 200) {
      console.log('User Details:', response.data.data); 
      return response.data.data; // This will be the user object
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
};

export default getUserDetail;


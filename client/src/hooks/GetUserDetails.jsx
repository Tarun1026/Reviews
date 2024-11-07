import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const getUserDetail = async () => {
  
  try {
    const response = await axios.get(`${apiUrl}/api/users/current-user-details`, {
      // withCredentials: true 
    });

    if (response.status === 200) {
      // console.log('User Details:', response.data.data); 
      return response.data.data; // This will be the user object
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
};

export default getUserDetail;


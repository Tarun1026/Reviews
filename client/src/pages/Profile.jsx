import React, { useEffect, useState } from 'react';
import getUserDetail from '../hooks/GetUserDetails';
import Navbar from '../component/Navbar';
import '../css/Profile.css';

function Profile() {
  // State to store user details
  const [user, setUser] = useState(null);

  // Fetch user details when component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetail();
      console.log("Fetched user details:", userDetails);
      setUser(userDetails); // Set the user data in state
    };

    fetchUserDetails();
  }, []);


  if (!user) {
    return <div className='check'>Loading user details...</div>;
  }

  // Render user details once fetched
  return (
    <div>
      <h1 className='check'>Profile</h1>
      {/* Pass username to the Navbar */}
      {/* <Navbar isLoggedIn={true} name={user.username} /> */}
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default Profile;

import { useState, useEffect } from 'react';
import getUserDetail from '../hooks/GetUserDetails';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import LogoutModal from '../models/Logout.model';
import "../css/Navbar.css";

const Navbar = ({ isLoggedIn, onRegisterClick, onLogout }) => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    const userDetails = await getUserDetail();
    if (userDetails) {
      setUser(userDetails);
      localStorage.setItem('user', JSON.stringify(userDetails));
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    localStorage.removeItem('user');
    setUser(null);
    onLogout();
  };

  return (
    <div className="navDiv">
      <div className="navItem">Movie Review</div>
      <div className="navItem">
        <Link to="/movies" className="navItemLink">Movies</Link>
      </div>
      <div className="navItem">Web Series</div>
      <div className="navItem">TV Shows</div>
      <input type="text" className="searchInput" placeholder="Search..." />

      <div className="navRight">
        {user ? (
          <div className="userSection" onClick={toggleDropdown}>
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="profileImage" />
            ) : (
              <FaUserCircle className="userIcon" />
            )}
            <span className="username">{user?.username}</span>

            {dropdownVisible && (
              <div className="dropdownMenu">
                <div className="dropdownItem">Your Activity</div>
                <div className="dropdownItem">Your Watchlist</div>
                <div className="dropdownItem">
                  <Link to="/user-account-setting">Account Settings</Link>
                </div>
                <div className="dropdownItem" onClick={openLogoutModal}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          <button className="registerButton" onClick={onRegisterClick}>
            Register
          </button>
        )}
      </div>

      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={closeLogoutModal}
        onLogoutConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default Navbar;

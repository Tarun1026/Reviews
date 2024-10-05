import { useState, useEffect } from 'react';
import getUserDetail from '../hooks/GetUserDetails';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import LogoutModal from '../models/Logout.model';
import "../css/Navbar.css";

const Navbar = ({ isLoggedIn, onRegisterClick, onLogout }) => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false); // State for logout modal

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetail();
      setUser(userDetails);
    };

    fetchUserDetails();
  }, []);

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
    onLogout(); // Call the passed logout handler
  };

  return (
    <div className="navDiv">
      <div className="navItem">Movie Review</div>
      <div className="navItem"><Link to="/movies" className='navItemLink'>Movies</Link></div>
      <div className="navItem">Web Series</div>
      <div className="navItem">TV Shows</div>
      <input type="text" className="searchInput" placeholder="Search..." />

      <div className="navRight">
        {isLoggedIn ? (
          <div className="userSection" onClick={toggleDropdown}>
            <FaUserCircle className="userIcon" />
            <span className="username">{user.username}</span>

            {dropdownVisible && (
              <div className="dropdownMenu">
                <div className="dropdownItem">Your Activity</div>
                <div className="dropdownItem">Your Watchlist</div>
                <div className="dropdownItem">Account Settings</div>
                <div className="dropdownItem" onClick={openLogoutModal}>Logout</div> {/* Open modal on logout */}
              </div>
            )}
          </div>
        ) : (
          <button className="registerButton" onClick={onRegisterClick}>
            Register
          </button>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={closeLogoutModal}
        onLogoutConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default Navbar;

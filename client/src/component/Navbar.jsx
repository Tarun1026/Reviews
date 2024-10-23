// import { useState, useEffect } from 'react';
import getUserDetail from '../hooks/GetUserDetails';
import { useState, useRef, useEffect } from 'react';
import {  useLocation } from 'react-router-dom';

import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import LogoutModal from '../models/Logout.model';
import loadMovies from '../hooks/useTMDBSearch';
import { useNavigate } from 'react-router-dom';
import "../css/Navbar.css";
import image from "../assets/medium-cover.jpg";

const Navbar = ({ isLoggedIn, onRegisterClick, onLogout }) => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  
  const location = useLocation(); // Get the current route
  const [activeLink, setActiveLink] = useState('');

  // Set the active link based on the current route
  useEffect(() => {
    const currentPath = location.pathname;
    setActiveLink(currentPath);
  }, [location]);

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
  const navigate = useNavigate();

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

  // Function to fetch movies as user types
  useEffect(() => {
    const fetchMovies = async () => {
      if (searchTerm) {
        const moviesData = await loadMovies(searchTerm);
        setMovies(moviesData);
      } else {
        setMovies([]);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchMovies();
    }, 300); // Debounce time of 300ms

    return () => clearTimeout(debounceFetch); // Clean up the timeout
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMovieClick=(movie)=>{
    navigate('/review',{state:{movie}})
  }
  return (
    <div className="navDiv">
       <div className="navItem">
        <Link
          to="/"
          className={`navItemLink ${activeLink === '/' ? 'active' : ''}`} // Check if the path is active
        >
          Home
        </Link>
      </div>
      <div className="navItem">
        <Link
          to="/movies"
          className={`navItemLink ${activeLink === '/movies' ? 'active' : ''}`}
        >
          Movies
        </Link>
      </div>
      <div className="navItem">
        <Link
          to="/webseries"
          className={`navItemLink ${activeLink === '/webseries' ? 'active' : ''}`}
        >
          Web Series
        </Link>
      </div>
      <div className="navItem">
        <Link
          to="/tvShows"
          className={`navItemLink ${activeLink === '/tvShows' ? 'active' : ''}`}
        >
          TV Shows
        </Link>
      </div>
      <div className="search-container">
        <div className="search-element">
          <input
            type="text"
            className="form-control"
            placeholder="Search Movie Title ..."
            ref={searchInputRef}
            value={searchTerm}
            onChange={handleSearchChange} // Trigger search on input change
          />

          <div className="search-list">
            {searchTerm && movies.length === 0 && (
              <p>No results found.</p>
            )}
            {movies.length > 0 && (
              movies.map((movie) => (
                <div key={movie.id} className="search-list-item" onClick={()=>{handleMovieClick(movie)}}>
                  <div className="search-item-thumbnail">
                    <img
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : image}
                      alt={movie.name || movie.title}
                    />
                  </div>
                  <div className="search-item-info">
                    <h3>{movie.name || movie.title}</h3>
                    <p>{movie.release_date || movie.first_air_date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

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

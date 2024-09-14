import React from 'react';
import "../css/HomePage.css";

function HomePage() {
  return (
    <div className="homePageContainer">
        <div className='navDiv'>
            <div className="navItem">Movie Review</div>
            <div className="navItem">Movies</div>
            <div className="navItem">Web Series</div>
            <div className="navItem">TV Shows</div>
            <input
              type='text'
              className="searchInput"
            />
            <button className="registerButton">Register</button>
        </div>
        <div className="content">
            {/* Add your content here */}
        </div>
    </div>
  );
}

export default HomePage;

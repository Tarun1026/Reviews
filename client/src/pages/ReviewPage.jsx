import React, { useState, useEffect } from 'react'; // Import useState
import { useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from '../component/Navbar';
import { FaStar, FaRegStar } from 'react-icons/fa';
import '../css/ReviewPage.css'; // Import the new CSS file
import axios from 'axios';

const ReviewPage = () => {
  const location = useLocation();
  const { movie } = location.state; // Access the passed movie details
  const [movieReviews, setMovieReviews] = useState([]);
  const [isReviewVisible, setReviewVisible] = useState(false); // State to toggle review section
  const [reviewText, setReviewText] = useState(''); // State to store review text

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const result = await axios.post('/api/users/movie-reviews', { movieId: movie.id });
        console.log("Fetched reviews:", result.data);
       setMovieReviews(result.data.data);
       
      } catch (err) {
        console.log("Error fetching reviews:", err);
      }
    };

    fetchMovieReviews();
  }, [movie.id]);

  useEffect(() => {
    console.log("Updated movieReviews:", movieReviews);
  }, [movieReviews]);
  // Handle showing/hiding the review section
  const handleReviewClick = () => {
    setReviewVisible(!isReviewVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('/api/users/user-review', {
        reviewText,
        movieId: movie.id,
        movieTitle: movie.title,
      });
      console.log('result', result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="reviewPageContainer">
        {/* Top Section (Title, Release Date, Rating Row) */}
        <div className="topSection">
          <div className="titleDateContainer">
            <h1>{movie.title}</h1>
            <h2>{movie.release_date} | {movie.original_language.toUpperCase()}</h2>
          </div>

          {/* Ratings Section */}
          <div className="ratingsRow">
            <div className="ratingContainer">
              <h2>Movie Rating</h2>
              <div className="ratingDetails">
                <FaStar size={40} />
                <div>
                  <h3>{movie.vote_average}<span>/ 10</span></h3>
                </div>
              </div>
            </div>
            <div className="userRatingContainer">
              <h2>Your Rating</h2>
              <div className="userStarIcon">
                <FaRegStar size={50} />
              </div>
            </div>
            <div className="popularityContainer">
              <h2>Popularity</h2>
              <div className="popularityValue">
                <h3>{movie.popularity}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section (Images and Overview) */}
        <div className="bottomSection">
          <div className="imagesContainer">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="moviePosters"
            />
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className="movieBackdrops"
            />
          </div>
          <p className="movieOverview">{movie.overview}</p>
        </div>

        {/* Review Section */}
        <div className="reviewSection">
          <button onClick={handleReviewClick} className="reviewButton">
            {isReviewVisible ? 'Hide Review' : '+ Write a Review'}
          </button>

          {isReviewVisible && (
            <div className="reviewInputContainer">
              <textarea
                className="reviewInput"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
              />
              <button className="submitReviewButton" onClick={handleSubmit}>Submit Review</button>
            </div>
          )}

          {/* Display existing reviews */}
          <div className="existingReviews">
            <h2>Reviews</h2>
            {movieReviews.length > 0 ? (
              movieReviews.map((review, index) => (
                <div key={review._id} className="singleReview">
                  <p><strong>{review.username}:</strong> {review.reviewText}</p>
                </div>
              ))
            ) : (
              <p>No reviews available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { FaStar, FaRegStar, FaThumbsUp } from 'react-icons/fa'; // Import thumbs up icon
import '../css/ReviewPage.css';
import axios from 'axios';

const ReviewPage = () => {
  const location = useLocation();
  const { movie } = location.state; 
  const [movieReviews, setMovieReviews] = useState([]);
  const [isReviewVisible, setReviewVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [likeCount, setLikeCount] = useState(0); 
  const [hasLiked, setHasLiked] = useState(false); 

  useEffect(() => {
    const fetchMovieLikes = async () => {
      try {
        const res = await axios.post('/api/users/movie-likes-count', { movieId: movie.id });
        console.log("Result", res.data);
      if (res.data.data.likedCount){
        setLikeCount(res.data.data.likedCount)
      }
      else{
        setLikeCount(0)
        }
       
      } catch (err) {
        console.log("Error fetching Movie Likes Count:", err);
      }
    };

    fetchMovieLikes();
}, [movie.id]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const result = await axios.post('/api/users/movie-reviews', { movieId: movie.id });
        console.log("Fetched reviews:", result.data);
        if (result.data.data.currentMovieReview){
          setMovieReviews(result.data.data.currentMovieReview);
        }
        else{
          setMovieReviews([])
        }
      } catch (err) {
        console.log("Error fetching reviews:", err);
      }
    };

    fetchMovieReviews();
  }, [movie.id]);

  // useEffect(() => {
  //   console.log("Updated movieReviews:", movieReviews);
  // }, [movieReviews]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const result = await axios.get(`/api/users/movie-is-liked/${movie.id}`);
        setHasLiked(result.data.liked); // Update hasLiked based on backend response
      } catch (err) {
        console.log("Error fetching like status:", err);
      }
    };

    fetchLikeStatus();
  }, [movie.id]);

  const handleReviewClick = () => {
    setReviewVisible(!isReviewVisible);
  };

  const handleLikeClick = async () => {
    try {
      const result = await axios.post('/api/users/movie-like', {
        movieId: movie.id,
        movieTitle: movie.title
      });
  
      // Toggle hasLiked based on the result from the backend
      if (result.data.message === "Video likes successfully") {
        setHasLiked(true);  // User liked the movie
      } else if (result.data.message === "Video like Removed") {
        setHasLiked(false);  // User unliked the movie
      }
      
      console.log("Result:", result);
    } catch (err) {
      console.log("Error sending like:", err);
    }
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
        <div className="topSection">
          <div className="titleDateContainer">
            <h1>{movie.title}</h1>
            <h2>{movie.release_date} | {movie.original_language.toUpperCase()}</h2>
          </div>

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

        {/* Like Button and Like Count */}
        <div className="likeSection">
          <button
            className="likeButton"
            onClick={handleLikeClick}
            style={{ color: hasLiked ? 'blue' : 'grey' }} // Color changes based on hasLiked state
          >
            <FaThumbsUp size={30} />
          </button>
          <p>{likeCount} Likes</p>
        </div>


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

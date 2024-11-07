import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
import {
  FaThumbsUp,
  FaCheck,
} from "react-icons/fa";
import "../css/ReviewPage.css";
import axios from "axios";
import ReviewSection from "../component/reviewSection/ReviewSection";
const ReviewPage = () => {
  const location = useLocation();
  const { movie } = location.state;
  const [movieReviews, setMovieReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [isReviewVisible, setReviewVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchlistSuccess, setWatchlistSuccess] = useState(false);
  const [movieReplies, setMovieReplies] = useState([]);
  const fetchMovieReviews = async () => {

    try {
      const result = await axios.post("/api/users/movie-reviews", {
        movieId: movie.id,
      });
      setReviewCount(result.data.data.movieReviewCount);
      console.log("Movies Result", result.data.data.currentMovieReview);
      setMovieReviews(result.data.data.currentMovieReview || []);
    } catch (err) {
      console.log("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchMovieReviews();
  }, [movie.id]);

 

  useEffect(() => {
    const fetchMovieLikes = async () => {
      try {
        const res = await axios.post("/api/users/movie-likes-count", {
          movieId: movie.id,
        });
        setLikeCount(res.data.data.likedCount || 0);
      } catch (err) {
        console.log("Error fetching Movie Likes Count:", err);
      }
    };

    fetchMovieLikes();
  }, [movie.id]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const result = await axios.get(`/api/users/movie-is-liked/${movie.id}`);
        setHasLiked(result.data.liked);
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
      const result = await axios.post("/api/users/movie-like", {
        movieId: movie.id,
        movieTitle: movie.title || movie.name,
      });
      setHasLiked(result.data.message === "Video likes successfully");
      window.location.reload();
    } catch (err) {
      console.log("Error sending like:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText || rating === 0) {
      alert("Please write a review and select a rating from 1 to 10.");
      return;
    }

    try {
      await axios.post("/api/users/user-review", {
        reviewText,
        rating,
        movieId: movie.id,
        movieTitle: movie.title || movie.name,
      });
      alert("Review submitted successfully!");
      setReviewText("");
      setRating(0);

      // Refresh reviews after submission
      fetchMovieReviews(); // Re-fetch the reviews to get the updated list
    } catch (err) {
      console.log(err);
    }
  };


  const handleAddToWatchlist = async () => {
    try {
      const result = await axios.post("/api/users/add-to-watchlist", {
        movieId: movie.id,
        movieTitle: movie.title || movie.name,
      });

      if (result.data.message == "Added to watchlist successfully") {
        setWatchlistSuccess(true);
        setIsInWatchlist(true); // Movie is now in watchlist
        // setTimeout(() => setWatchlistSuccess(false), 2000);
      } else if (result.data.message == "Removed from watchlist") {
        // If the movie was previously in watchlist and now is being removed
        setWatchlistSuccess(false);
        setIsInWatchlist(false);
      }

      console.log("res", result);
      alert(result.data.message || "Added to watchlist successfully!");
      // Optionally refresh or update state here if needed
    } catch (err) {
      console.error("Error adding to watchlist:", err);
      alert("Failed to add to watchlist.");
    }
  };


  const movieReplys = async () => {
    try {
      const rep = await axios.post("/api/users/movie-reply", {
        movieId: movie.id,
      });
      console.log("mr", rep.data.data.movieReplies);
      setMovieReplies(rep.data.data.movieReplies);
      console.log("fd", movieReplies);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    movieReplys();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="reviewPageContainer">
        <div className="topSection">
          <div className="movie">
            <div className="movie__intro">
              <img
                className="movie__backdrop"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={`${movie.title} backdrop`}
              />
              <button
                className={`watchlistButton ${
                  isInWatchlist ? "in-watchlist" : ""
                }`}
                onClick={handleAddToWatchlist}
              >
                {watchlistSuccess ? <FaCheck /> : "+"} {/* Show tick or '+' */}
                {isInWatchlist ? " In Watchlist" : " Add to Watchlist"}
              </button>
            </div>
            <div className="movie__detail">
              <div className="movie__detailLeft">
                <div className="movie__posterBox">
                  <img
                    className="movie__poster"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  />
                </div>
              </div>
              <div className="movie__detailRight">
                <div className="movie__detailRightTop">
                  <div className="movie__name">
                    {movie.original_title || movie.name}
                  </div>
                  <div className="movie__rating">
                    {movie.vote_average} <i className="fas fa-star" />
                    <span className="movie__voteCount">
                      {"(" + movie.vote_count + ") votes"}
                    </span>
                  </div>
                  <div className="movie__releaseDate">
                    {movie.release_date || movie.first_air_date}
                  </div>
                </div>
                <div className="movie__detailRightBottom">
                  <div className="synopsisText">Description</div>
                  <div>{movie.overview}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reviewSection">
        <div className="buttonsContainer">
          <div className="likeSection">
            <button
              className="likeButton"
              onClick={handleLikeClick}
              style={{ color: hasLiked ? "blue" : "grey" }}
            >
              <FaThumbsUp size={30} />
            </button>
            <p className="likes">{likeCount} Likes</p>
          </div>
          <div className="count">{reviewCount ? reviewCount : 0} reviews</div>
          <button onClick={handleReviewClick} className="reviewButton">
            {isReviewVisible ? "Hide Review" : "+ Add Review"}
          </button>
        </div>

        {isReviewVisible && (
          <div className="reviewInputContainer">
            <textarea
              className="reviewInput"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
            />
            <div className="ratingSelection">
              <label htmlFor="rating">Select Rating: </label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              >
                <option value="0">Select Rating</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button className="submitReviewButton" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
        )}

        <div className="existingReviews">
          <h2>Reviews</h2>
          {movieReviews.length > 0 ? (
            movieReviews.map((review) => (
              <div key={review._id} className="singleReview">
                <ReviewSection review={review} database={"Review"} movie={movie}/>
                
                {movieReplies.length > 0 && (
                  <div className="existingReplies">
                    {movieReplies.map((reply) => (
                      <div key={reply._id} className="reply">
                        {reply.parentId == review._id && (
                          <div>
                            
                            <ReviewSection review={reply} database={"Reply"} movie={movie}/>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
import { FaStar, FaRegStar, FaThumbsUp } from "react-icons/fa";
import { VscKebabVertical } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import "../css/ReviewPage.css";
import axios from "axios";

const ReviewPage = () => {
  const location = useLocation();
  const { movie } = location.state;
  const [movieReviews, setMovieReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [isReviewVisible, setReviewVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchMovieLikes = async () => {
      try {
        const res = await axios.post("/api/users/movie-likes-count", {
          movieId: movie.id,
        });
        console.log("Result", res.data);
        if (res.data.data.likedCount) {
          setLikeCount(res.data.data.likedCount);
        } else {
          setLikeCount(0);
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
        const result = await axios.post("/api/users/movie-reviews", {
          movieId: movie.id,
        });
        console.log("Fetched reviews:", result.data);
        setReviewCount(result.data.data.movieReviewCount);
        console.log("rev",reviewCount)
        if (result.data.data.currentMovieReview) {
          setMovieReviews(result.data.data.currentMovieReview);
          
          
        } else {
          setMovieReviews([]);
        }
      } catch (err) {
        console.log("Error fetching reviews:", err);
      }
    };

    fetchMovieReviews();
  }, [movie.id]);

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
      const result = await axios.post("/api/users/movie-like", {
        movieId: movie.id,
        movieTitle: movie.title,
      });

      // Toggle hasLiked based on the result from the backend
      if (result.data.message === "Video likes successfully") {
        setHasLiked(true); // User liked the movie
      } else if (result.data.message === "Video like Removed") {
        setHasLiked(false); // User unliked the movie
      }

      console.log("Result:", result);
    } catch (err) {
      console.log("Error sending like:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/users/user-review", {
        reviewText,
        movieId: movie.id,
        movieTitle: movie.title,
      });
      console.log("result", result);

      // Clear the review input after submission
      setReviewText("");

      // Optionally refetch the reviews to update the list
      fetchMovieReviews();
    } catch (err) {
      console.log(err);
    }
  };

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
              />
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
                  <div className="movie__name">{movie.original_title}</div>

                  <div className="movie__rating">
                    {movie.vote_average} <i class="fas fa-star" />
                    <span className="movie__voteCount">
                      {"(" + movie.vote_count + ") votes"}
                    </span>
                  </div>

                  <div className="movie__releaseDate">{movie.release_date}</div>
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
          <div className="count">{reviewCount?reviewCount:0} reviews</div>
          <div className="sortDropdownContainer">
            <select className="sortDropdown">
              <option value="latest">Sort by Latest</option>
              <option value="oldest">Sort by Oldest</option>
            </select>
          </div>
          {/* Add Review Button */}
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
            <button className="submitReviewButton" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
        )}

        {/* Display existing reviews */}
        <div className="existingReviews">
          <h2>Reviews</h2>
          {movieReviews.length > 0 ? (
            movieReviews.map((review, index) => (
              <div key={review._id} className="singleReview">
                <div className="reviewContent">
                  <div className="ratingCommentSection">
                    <div className="ratingStars">
                      <FaStar size={20} className="filledStar" />
                      <span>{review.rating}/10</span>
                    </div>
                    <div className="reviewText">{review.reviewText}</div>
                  </div>
                  <div className="reviewOptions">
                    <span><VscKebabVertical/></span>
                  </div>
                </div>
                <div className="reviewFooter">
                  <div className="reviewUser">
                    {review.profileImage ? (
                      <img
                        src={review.profileImage}
                        alt={review.username}
                        className="profileImage"
                      />
                    ) : (
                      <FaUserCircle size={30} />
                    )}
                    <span>{review.username}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;

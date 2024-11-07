import React, { useState, useEffect } from "react";
import {
    FaStar,
    FaRegComment,
  } from "react-icons/fa";
import { VscKebabVertical } from "react-icons/vsc";
import getUserDetail from "../../hooks/GetUserDetails";
import axios from "axios";

function ReviewSection({review,database,movie}) {
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editReviewText, setEditReviewText] = useState("");
    const [editRating, setEditRating] = useState(0);
    const [showOptionsId, setShowOptionsId] = useState(null);
    const [user, setUser] = useState(null);
    const [showReplySectionId, setShowReplySectionId] = useState(null); 
  const [replyText, setReplyText] = useState("");

  
    useEffect(() => {
        // console.log("useEffect triggered");
        fetchUserDetails();
      }, []);
      
      const fetchUserDetails = async () => {
        try {
          // console.log("Calling getUserDetail...");
          const userDetails = await getUserDetail();
          // console.log("userDetails fetched:", userDetails);
          setUser(userDetails);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      

    const handleSaveEdit = async (reviewId) => {
        try {
         
          await axios.post(`/api/users/edit-review`, {
            reviewId: reviewId,
            reviewText: editReviewText,
            rating: editRating,
            database:database,
          });
          alert("Review updated successfully!");
          setEditingReviewId(null);
          window.location.reload();
        } catch (err) {
          console.log("Error updating review:", err);
        }
      };

      const handleCancelEdit = () => {
        setEditingReviewId(null);
        setEditReviewText("");
        setEditRating(0);
      };

      const handleEditClick = (review) => {
        setEditingReviewId(review._id);
        setEditReviewText(review.reviewText);
        setEditRating(review.rating);
      };
    
      const handleDeleteReview = async (reviewId) => {
        try {
          await axios.post(`/api/users/delete-review`, {
            reviewId: reviewId,
          });
          alert("Review deleted successfully!");
          window.location.reload();
        } catch (err) {
          console.log("Error deleting review:", err);
        }
      };

      const toggleOptions = (reviewId) => {
        setShowOptionsId(showOptionsId === reviewId ? null : reviewId); // Toggle options
      };

      const toggleReplySection = (reviewId) => {
        setShowReplySectionId(showReplySectionId === reviewId ? null : reviewId);
      };

      const handleReplySubmit = async (reviewId) => {
        try {
          const result = await axios.post("/api/users/add-reply", {
            movieId: movie.id,
            reviewId: reviewId,
            reviewText: replyText,
            movieTitle: movie.title || movie.name,
          });
          alert("Reply submitted successfully!");
          setReplyText("");
          console.log("reply", result.data);
          window.location.reload();

        } catch (err) {
          console.log("Error submitting reply:", err);
        }
      };
  return (
    <div>
        <div className="reviewContent">
          
                  <div className="ratingCommentSection">
                  {database==="Review"?<div className="ratingStars">
                      <FaStar size={20} className="filledStar" />
                      <span>{review.rating}/10</span>
                    </div>:""}
                    
                    <div className="reviewText">
                      {editingReviewId === review._id ? (
                        <>
                          <textarea
                            value={editReviewText}
                            onChange={(e) => setEditReviewText(e.target.value)}
                            placeholder="Edit your review here..."
                          />
                          {database==="Review"?
                          <div className="ratingSelection">
                            <label htmlFor={`edit-rating-${review._id}`}>
                              Select Rating:{" "}
                            </label>
                            <select
                              id={`edit-rating-${review._id}`}
                              value={editRating}
                              onChange={(e) =>
                                setEditRating(parseInt(e.target.value))
                              }
                            >
                              <option value="0">Select Rating</option>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </div>:""}
                          <button onClick={() => handleSaveEdit(review._id)}>
                            Save
                          </button>
                          <button onClick={handleCancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <div>{review.reviewText}</div>
                      )}
                    </div>
                  </div>
                  {review.username === user?.username && (
                    <div className="reviewOptions">
                      <span onClick={() => toggleOptions(review._id)}>
                        <VscKebabVertical />
                      </span>
                      {showOptionsId === review._id && (
                        <div className="optionsDropdown">
                          <button onClick={() => handleEditClick(review)}>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
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
                 {database==="Review"?
                <button
                  onClick={() => toggleReplySection(review._id)}
                  className="btnReply"
                >
                  <FaRegComment />
                </button>:""}
                {showReplySectionId === review._id && (
                  <div className="replySection">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply here..."
                    />
                    <button onClick={() => handleReplySubmit(review._id)}>
                      Submit Reply
                    </button>
                  </div>
                )}

    </div>
  )
}

export default ReviewSection
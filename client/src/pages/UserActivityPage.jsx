import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/UserActivityPage.css";
import MovieCards from '../component/movieCards/MovieCards';
import Navbar from '../component/Navbar';

const UserActivityPage = ({ userId }) => {
    const [activityData, setActivityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedItems, setLikedItems] = useState([]); // State for liked movies and web series
    const [userReviews, setUserReviews] = useState([]); 
    const [watchList,setWatchList]=useState([])
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchUserActivity = async () => {
            try {
                const response = await axios.get(`/api/users/get-user-activity`);
                console.log("act",response)
                setActivityData(response.data.data);
                // setWatchList(response.data.data.userWatchList)
                await fetchLikedItems(response.data.data);
                await fetchWatchListItems(response.data.data)
                setUserReviews(response.data.data.userReviews); // Set user reviews
            } catch (error) {
                console.log("Error fetching user activity:", error);
                setError(error); // Set error if fetching fails
            } finally {
                setLoading(false);
            }
        };

        fetchUserActivity();
    }, []);

    const fetchMovieDetails = async (movieId) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4b2313ca982860407b4ff3a8e3258ff7`);
            return response.data; // Return movie data
        } catch (error) {
            console.error("Error fetching movie details:", error);
            throw error; // Propagate the error
        }
    };

    // Combine liked movies and web series
    const fetchLikedItems = async (data) => {
        const likedItemsWithDetails = await Promise.all(data.userLikes.map(async (item) => {
            const movieDetails = await fetchMovieDetails(item.movieId);
            return { ...movieDetails, description: item.description, type: item.type }; // Include type and description
        }));

        setLikedItems(likedItemsWithDetails);
        console.log("liked",likedItemsWithDetails) // Set combined liked items
    };
    const fetchWatchListItems = async (data) => {
        const likedWatchListItems = await Promise.all(data.userWatchList.map(async (item) => {
            const movieDetails = await fetchMovieDetails(item.movieId);
            return { ...movieDetails, description: item.description, type: item.type }; // Include type and description
        }));

        setWatchList(likedWatchListItems); // Set combined liked items
    };

    const handleReviewClick = async(review) => {
        const movie = await fetchMovieDetails(review.movieId);
        navigate("/review", { state: { movie } }); // Navigate to review page with movie data
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <h2> {error.response.data.message}</h2>; // Display error message
    }

    return (
        <>
        <Navbar/>
        <div className="userActivityPage">
            <h1>Your Activity</h1>
            <section className="activitySection">
                {/* <h2>Liked Movies & Web Series</h2> */}
                {likedItems.length > 0 ? (
                    <MovieCards movieSent={likedItems} heading="Liked Movies & Web Series" />
                ) : (
                    <p>No Liked movies or web series found.</p>
                )}
            </section>
            <section className="activitySection">
                {/* <h2>Liked Movies & Web Series</h2> */}
                {watchList.length > 0 ? (
                    <MovieCards movieSent={watchList} heading="Your WatchList" />
                ) : (
                    <p>Your watchList (0)</p>
                )}
            </section>

            <section className="activitySection">
                <h2>Your Reviews</h2>
                {userReviews.length > 0 ? (
                    userReviews.map((review) => (
                        <div key={review.movieId} 
                        className="reviewItem"
                        onClick={() => handleReviewClick(review)}>
                            <h3>{review.movieTitle}</h3>
                            <p>{review.reviewText}</p>
                            <p>Rating: {review.rating}/10</p>
                            <p>Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</p> {/* Format date */}
                        </div>
                    ))
                ) : (
                    <p>No reviews found.</p>
                )}
            </section>
        </div>
        </>
    );
};

export default UserActivityPage;

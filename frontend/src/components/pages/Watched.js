import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/Watched.css'

const Watched = () => {
    const [watchedShows, setWatchedShows] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatchedShows = async () => {
            try {
                const response = await api.get('/watched');
                setWatchedShows(response.data);
            } catch (error) {
                setError('Error fetching watched shows. Please try again.');
            }
        };

        fetchWatchedShows();
    }, []);

    const removeFromWatched = async (watchedId) => {
        try {
            await api.delete(`/watched/${watchedId}`);
            setWatchedShows((prevShows) => prevShows.filter((show) => show.WatchedId !== watchedId));
        } catch (error) {
            setError('Error removing from watched shows. Please try again.');
        }
    };

    return (
        <div className="watched-container">
            <h2 className='available'>Watched Shows</h2>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {watchedShows.map((watchedShow) => (
                    <li key={watchedShow.WatchedId} className="watched-show-item">
                        <h3>{watchedShow.Title}</h3>
                        <p>{watchedShow.Genre}</p>
                        <button onClick={() => removeFromWatched(watchedShow.WatchedId)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Watched;
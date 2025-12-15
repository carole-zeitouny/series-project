
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/WatchList.css'

const WatchList = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await api.get('/watchlist');
                setWatchlist(response.data);
            } catch (error) {
                setError('Error fetching watchlist. Please try again.');
            }
        };

        fetchWatchlist();
    }, []);

    const removeFromWatchlist = async (showId) => {
        try {
            await api.delete(`/watchlist/${showId}`);
            setWatchlist((prevShows) => prevShows.filter((show) => show.ShowId !== showId));
        } catch (error) {
            setError('Error removing from watchlist. Please try again.');
        }
    };

    return (
        <div className="watchlist-container">
            <h2 className='available'>Watchlist</h2>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {watchlist.map((watchedShow) => (
                    <li key={watchedShow.ShowId} className="watchlist-show-item">
                        <h3>{watchedShow.Title}</h3>
                        <button onClick={() => removeFromWatchlist(watchedShow.ShowId)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WatchList;

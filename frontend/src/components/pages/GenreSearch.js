import React, { useState } from 'react';
import api from '../services/api';
import '../styles/GenreSearch.css';

const GenreSearch = () => {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genreShows, setGenreShows] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedShowDetails, setSelectedShowDetails] = useState(null);

    const fetchGenreShows = async (genre) => {
        try {
            const response = await api.get(`/shows/genre/${genre}`);
            setGenreShows(response.data);
        } catch (error) {
            console.error(`Error fetching ${genre} shows:`, error);
        }
    };

    const fetchShowDetails = async (title) => {
        try {
            const response = await api.get(`/show/${title}`);
            setSelectedShowDetails(response.data);

            const detailsContainer = document.querySelector('.show-details-container');
            if (detailsContainer) {
                detailsContainer.style.display = 'block';
            }
        } catch (error) {
            console.error(`Error fetching details for ${title}:`, error);
        }
    };

    const handleGenreChange = (e) => {
        const genre = e.target.value;
        setSelectedGenre(genre);
        setGenreShows([]);
        setSelectedTitle('');
        setSelectedShowDetails(null);

        if (genre) {
            fetchGenreShows(genre);
        }
    };

    const handleTitleClick = (title) => {
        setSelectedTitle(title);
        fetchShowDetails(title);
    };

    const closeDetailsContainer = () => {
        const detailsContainer = document.querySelector('.show-details-container');
        if (detailsContainer) {
            detailsContainer.style.display = 'none';
        }
    };

    return (
        <div className="genre-search-container">
            <h2 className='available'>Search by Genre</h2>
            <label className="genre-search-label">Select a genre:</label>
            <select
                value={selectedGenre}
                onChange={handleGenreChange}
                className="genre-search-select"
            >
                <option value="">-- Select Genre --</option>
                <option value="Sitcom">Sitcom</option>
                <option value="Crime">Crime</option>
                <option value="Drama">Drama</option>
                <option value="Action">Action</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>

            </select>

            {selectedGenre && (
                <div className="genre-shows-container">
                    <h3>TV Shows in {selectedGenre}</h3>
                    <ul className="genre-shows-list">
                        {genreShows.map((show) => (
                            <li
                                key={show.ShowId}
                                onClick={() => handleTitleClick(show.Title)}
                                className="genre-show-item"
                            >
                                <h4 className="genre-show-title">{show.Title}</h4>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="show-details-container">
                <span className="show-details-close" onClick={closeDetailsContainer}>
                    &times;
                </span>
                {selectedShowDetails && (
                    <div className="show-details">
                        <h3 className='tile'>{selectedShowDetails.Title}</h3>
                        <p>Genre:<span className='detail'> {selectedShowDetails.Genre}</span></p>
                        <p>Seasons & Episodes:<span className='detail'> {selectedShowDetails.Seasons}</span></p>
                        <p>Summary: <span className='detail'>{selectedShowDetails.Summary}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenreSearch;

// /frontend/src/App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/pages/Home';
import TVShows from './components/pages/TVShows';
import WatchList from './components/pages/WatchList';
import Watched from './components/pages/Watched';
import GenreSearch from './components/pages/GenreSearch';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import './App.css';

function App() {
    const location = useLocation();

    const routesWithHeader = ['/home', '/tv-shows', '/watch-list', '/watched', '/search'];

    const displayHeader = routesWithHeader.includes(location.pathname);

    return (
        <div className="app-container">
            {displayHeader && <Header />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/tv-shows" element={<TVShows />} />
                <Route path="/watch-list" element={<WatchList />} />
                <Route path="/watched" element={<Watched />} />
                <Route path="/search" element={<GenreSearch />} />
            </Routes>
        </div>
    );
}

export default App;

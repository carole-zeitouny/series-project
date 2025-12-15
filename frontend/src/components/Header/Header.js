import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './finallogo.png';

const Header = () => {
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeaderFixed(scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={isHeaderFixed ? 'fixed-header' : ''}>
            <nav>
                <div className='app-header'>
                    <ul className='headerlist'>
                        <div className='buttonssection'>
                            <div className='imgsec'>
                                <li><Link to="home"><img src={logo} alt="Home" className="home-logo" /></Link></li>
                            </div>
                            <li><Link to="/tv-shows" className='header-button'>TV Shows</Link></li>
                            <li><Link to="/watch-list" className='header-button'>Watch List</Link></li>
                            <li><Link to="/watched" className='header-button'>Watched</Link></li>
                            <li><Link to="/search" className='header-button'>Search</Link></li>
                            <li><Link to="/" className='header-button'>Login</Link></li>


                        </div>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;

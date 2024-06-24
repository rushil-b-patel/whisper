import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
return (
    <header className="bg-white mx-10 border-b">
        <div className="container flex items-center justify-between py-4 px-4">
            <div className="flex items-center">
                <div>
                    <h1 className="text-3xl font-bold text-black">Whisper</h1>
                </div>
            </div>
            <nav className="flex space-x-4">
                <Link to='/community' className="text-black transition-colors duration-300">Community</Link>
                <Link to='/reviews' className="text-black transition-colors duration-300">Reviews</Link>
                <Link to='/peek' className="text-black transition-colors duration-300">peek</Link>
                <Link to='/contest' className="text-black transition-colors duration-300">Contests</Link>
            </nav>
            <div className="flex items-center space-x-2">
                <Link to='/login' className="text-black hover:underline transition-colors duration-300">login</Link>
                <Link to='/register' className="text-black hover:underline transition-colors duration-300">Register</Link>
            </div>
        </div>
    </header>
);
};

export default Header;

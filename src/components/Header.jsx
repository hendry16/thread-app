import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import '../styles/Header.css';

function Header({ }) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white/30 text-black h-16 border">
      <Link to="/">
        <h1 className="text-2xl text-gray-800 font-semibold">Threads</h1>
      </Link>
      {logout && <Navigation logout={logout} />}
    </header>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Header;

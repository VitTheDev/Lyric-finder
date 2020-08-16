import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark mb-5">
        <Link
          to="/"
          style={{ cursor: 'pointer' }}
          className="navbar-brand mb-0 mx-auto"
        >
          Lyric Finder
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;

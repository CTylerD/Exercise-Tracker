import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="App-link">
            <Link className="Nav-link" to="/">Home</Link>
            <Link className="Nav-link" to="/create">Create an Exercise</Link>
        </nav>
    );
}

export default Navigation;
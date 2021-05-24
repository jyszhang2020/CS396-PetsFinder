import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <nav>
                <div><Link to='/'>Home</Link></div>
                <div><Link to='/community'>Community</Link></div>
                <div><Link to='/listpet'>List a pet</Link></div>
            </nav>
        )
    }
}

export default NavBar;
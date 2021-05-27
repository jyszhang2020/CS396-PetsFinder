import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import PetsIcon from '@material-ui/icons/Pets';

class NavBar extends Component {
    render() {
        return (
            <nav className="petfind-nav">
                <h1> PetsFind <PetsIcon/></h1>
                <div id="nav-links">
                    <Link to='/'>Home</Link>
                    <Link to='/community'>Community</Link>
                    <Link to='/listpet'>List a pet</Link>
                </div>
            </nav>
        )
    }
}

export default NavBar;
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer className="petfind-footer">
                <div>
                    © 2021 PetsFind.com
                </div>
                <div>
                    <Link>Terms of Use </Link> | <Link>Privacy Policy</Link>
                </div>
            </footer>
        );
    }
}

export default Footer;

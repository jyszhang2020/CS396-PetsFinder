import React, { Component } from 'react';
import '../styles/Pet.css';

class Pet extends Component {
    render() {
        const {pet} = this.props;
        return (
            <div className="petform">
                <h2>{pet.name}</h2>
                <h2>{pet.species}</h2>
                <h2>{pet.sex}</h2>
                <h2>{pet.dob}</h2>
                <h2>{pet.price}</h2>
            </div>
        )
    }
}

export default Pet;
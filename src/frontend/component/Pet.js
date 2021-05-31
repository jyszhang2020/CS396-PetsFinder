import React, { Component } from 'react';
import '../styles/Pet.css';
import history from './history';

class Pet extends Component {

    

    render() {
        const {pet} = this.props;
        const goToCarddetails = (pet) => {
            console.log("here");
            localStorage.setItem("selectedPetID", pet._id);
        // you can manage here to pass the clicked card id to the card details page if needed
        }
        return (
            <div onClick={() => {
                goToCarddetails(pet)
                history.push('/allpets/' + pet._id);
                }} class="search-pet-card">
                <img className="search-pet-img" src={pet.image_url} alt=""></img>
                <div className="search-pet-info">
                    <div className="search-pet-name">{pet.name}</div>
                    <div><strong>Breed: </strong>{pet.breed}</div>
                    <div><strong>Sex: </strong>{pet.sex}</div>
                    <div><strong>Birthday: </strong>{pet.dob}</div>
                    <div><strong>Price: </strong>${pet.price}</div>
                    <div><strong>Location: </strong>{pet.location}</div>
                </div>
            </div>
)
    }
}

export default Pet;
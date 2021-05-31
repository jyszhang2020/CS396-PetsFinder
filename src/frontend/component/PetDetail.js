import React, { Component } from 'react';
import '../styles/Pet.css';

class PetDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pet : {}
        }
        
        let selectedCardId = localStorage.getItem("selectedPetID");
        const url = "http://localhost:8081/allpets/" + selectedCardId;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            }
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({pet: data});
                console.log(this.state.pet);
            })
    }
    
    render() {
        // you can get this cardId anywhere in the component as per your requirement 
        return (
            <div>
                <img className="search-pet-img" src={this.state.pet.image_url} alt=""></img>
                <div className="search-pet-info">
                    <div className="search-pet-name">{this.state.pet.name}</div>
                    <div><strong>Breed: </strong>{this.state.pet.breed}</div>
                    <div><strong>Sex: </strong>{this.state.pet.sex}</div>
                    <div><strong>Birthday: </strong>{this.state.pet.dob}</div>
                    <div><strong>Price: </strong>${this.state.pet.price}</div>
                    <div><strong>Location: </strong>{this.state.pet.location}</div>
                </div>
            </div>
        )
    }
}

export default PetDetail;
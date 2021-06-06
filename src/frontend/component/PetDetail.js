import React, { Component } from 'react';
import '../styles/PetDetail.css';

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
            <div className="pet-detail-container">
                <div className="pet-detail">
                    <img className="detail-pet-img" src={this.state.pet.image_url} alt=""></img>
                    <div className="detail-pet-info">
                        <div className="detail-pet-name">{this.state.pet.name}</div>
                        <div><strong>Species: </strong>{this.state.pet.species}</div>
                        {this.state.pet.breed ? (<div><strong>Breed: </strong>{this.state.pet.breed}</div>) : null}
                        <div><strong>Sex: </strong>{this.state.pet.sex}</div>
                        <div><strong>Birthday: </strong>{this.state.pet.dob}</div>
                        <div><strong>Price: </strong>${this.state.pet.price}</div>
                        <div><strong>Location: </strong>{this.state.pet.location}</div>
                        <div><strong>Contact Number: </strong>{this.state.pet.contact_phone}</div>
                        <div><strong>Detail: </strong>{this.state.pet.detail}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PetDetail;
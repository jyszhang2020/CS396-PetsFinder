import React, {Component} from 'react';
import Pet from './Pet';

class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allpets : []
        }
        const url = "http://localhost:8081/allpets";
        let jsonTarget= [];
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            }
        })
            .then(res => res.json())
            .then((res) => {
                res.forEach(function(pet) {
                    jsonTarget.push({species: pet.species, sex: pet.sex, price: pet.price, name: pet.name, detail: pet.detail, contact: pet.contact_phone, breed: pet.breed, dob: pet.dob});
                });
                this.setState({allpets: jsonTarget});
                console.log(this.state.allpets);
            })
    }
  

    render() {
        let pets = this.state.allpets;
        console.log("pets are ", this.state.allpets);
        return (
            <div>
                {pets.map((pet) => (
                    <Pet pet={pet}/>
                ))}
            </div>
        )
    }
}

export default Community;
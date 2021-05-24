import React, {Component} from 'react';

import Pet from './Pet';

class SearchBox extends Component {

    constructor() {
        super();
        this.state = {
            species: '',
            err: '',
            pets: []
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.species);

        fetch(`http://localhost:8081/filterpet/${this.state.species}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("data is ", data);
                this.setState({pets: data});
            })
            .catch(err => {
                this.setState({err: err.message});
            })
    }

    render() {
        let pets = this.state.pets;
        return (
            <div>
                <h1>SearchBox</h1>
                <input 
                    type="text" name="species"
                    onChange={this.changeHandler}
                    placeholder={"Species"}/>
                <button type="submig" onClick={this.submitHandler}>Search</button>
                {
                    pets.map((pet) => (
                        <Pet pet={pet}/>
                    ))
                }
            </div>
        )
    }
}

export default SearchBox;
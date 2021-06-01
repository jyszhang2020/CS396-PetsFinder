import React, {Component} from 'react';
import Pet from './Pet';
import { Slider } from "react-semantic-ui-range";
import { Button, Radio } from "semantic-ui-react";
import history from './history';

class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allpets : [],
            valueMin: 0,
            valueMax: 1000000000,
            sex: '',
        }
        
    }

    componentDidMount() {
        const url = "http://localhost:8081/allpets";
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
            this.setState({allpets: data});
            console.log(this.state.allpets);
        })  
    }

    handleChange = (e, { value }) => {
        this.setState({sex: value});
    }

    minSettings = {
        start: 0,
        min: 0,
        max: 5000,
        step: 1,
        onChange: value => {
          this.setState({
            valueMin: value
          })}
    };

    maxSettings = {
        start: 0,
        min: 0,
        max: 5000,
        step: 1,
        onChange: value => {
          this.setState({
            valueMax: value
          })}
    };

    submitHandler = (e) => {
        e.preventDefault();

        history.push({
            pathname: '/search',
            search: `?sex=${this.state.sex}&minPrice=${this.state.valueMin}&maxPrice=${this.state.valueMax}`,
        })
    }
    
    render() {
        let pets = this.state.allpets;
        
        console.log("pets are ", this.state.allpets);
        return (
            <>
                {
                    pets.length === 0 ? (
                        <div id="smallest-page-container">
                            <div class="search-result-container err">Sorry, there is no matching pet available!</div>
                        </div>
                    ) : (
                        <div id="smallest-page-container">
                            <div class="search-result-container result">
                                <div id="filter-section">
                                    <h3>TODO: filter</h3>
                                </div>
                                <div id="search-result-section">
                                    {pets.map((pet) => (
                                        <Pet pet={pet}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        )
    }
}

export default Community;
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
                                    TODO: Filters
                                    <h3>Set the Price Range</h3>
                                    <p>set min price</p>
                                    <Slider color="red" settings={this.minSettings} />
                                    {this.state.valueMin}
                                    <p>set max price</p>
                                    <Slider color="red" settings={this.maxSettings} />
                                    {this.state.valueMax}
                                    <h3>Choose the Sex</h3>
                                    <Radio
                                        label='Male'
                                        name='radioGroup'
                                        value='Male'
                                        onChange={this.handleChange}
                                        checked={this.state.sex === 'Male'}
                                    />
                                    <Radio
                                        label='Female'
                                        name='radioGroup'
                                        value='Female'
                                        onChange={this.handleChange}
                                        checked={this.state.sex === 'Female'}
                                    />
                                    <Button className="search-button" onClick={this.submitHandler}>Search</Button>
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
import React, {Component} from 'react';
import '../styles/SearchResult.css'
import { Slider } from "react-semantic-ui-range";
import { Button, Radio } from "semantic-ui-react";
import Pet from './Pet';
import history from './history';

const parseQueryParameter = q => {
    let qs = q.replace("?", "").split("&")
    let params = {}

    qs.forEach(param => {
        param = param.split("=")
        if (param[1] !== "")
        params[param[0]] = param[1].replaceAll("%20", " ")
    });

    return params
}

class SearchResult extends Component {
    constructor() {
        super();
        this.state = {
            pets: [],
            valueMin: 0,
            valueMax: 0,
            sex: ''
        }
    }
    
    componentDidMount() {
        let params = parseQueryParameter(this.props.location.search)
        console.log(params);
        if (params.sex !== undefined) {
            this.state.sex = params.sex;
        }
        if (params.minPrice !== undefined) {
            this.state.valueMin = params.minPrice;
        }
        if (params.maxPrice !== undefined) {
            this.state.valueMax = params.maxPrice;
        }
        fetch("http://localhost:8081/filterpet", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            }
        })
        .then(async response => {
            let data = await response.json()
            if (response.status === 404) {
                this.setState({err: data.message});
            } else if (response.status === 200) {
                console.log("data is ", data);
                this.setState({pets: data});
            }
        })
        .catch(err => {
            this.setState({err: err.message});
        })
    }

    handleChange = (e, { value }) => {
        this.setState({sex: value});
    }

    // minSettings = {
    //     start: this.state.valueMin,
    //     min: 0,
    //     max: 5000,
    //     step: 1,
    //     onChange: value => {
    //       this.setState({
    //         valueMin: value
    //       })}
    // };

    // maxSettings = {
    //     start: this.state.valueMax,
    //     min: 0,
    //     max: 5000,
    //     step: 1,
    //     onChange: value => {
    //       this.setState({
    //         valueMax: value
    //       })}
    // };

    submitHandler = (e) => {
        e.preventDefault();
        let params = parseQueryParameter(this.props.location.search)
        let species = '';
        let breed = '';
        let location = '';
        if (params.species !== undefined) { species = params.species}
        if (params.breed !== undefined) {breed = params.breed}
        if (params.location !== undefined) {location = params.location}
        history.push({
            pathname: '/search',
            search: `?species=${species}&breed=${breed}&location=${location}&sex=${this.state.sex}&minPrice=${this.state.valueMin}&maxPrice=${this.state.valueMax}`,
        })
    }

    render() {
        const pets = this.state.pets;
        const minSettings = {
            start: this.state.valueMin,
            min: 0,
            max: 5000,
            step: 1,
            onChange: value => {
              this.setState({
                valueMin: value
              })}
        };
    
        const maxSettings = {
            start: this.state.valueMax,
            min: 0,
            max: 5000,
            step: 1,
            onChange: value => {
              this.setState({
                valueMax: value
              })}
        };
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
                                    <h3>Set the Price Range</h3>
                                    <p>set min price</p>
                                    <Slider color="red" settings={minSettings} />
                                    {this.state.valueMin}
                                    <p>set max price</p>
                                    <Slider color="red" settings={maxSettings} />
                                    {this.state.valueMax}
                                    <h3>Choose the Sex</h3>
                                    <Radio
                                        label='Male'
                                        name='radioGroup'
                                        value='Male'
                                        onChange={this.handleChange}
                                        checked={this.state.sex === 'Male'}
                                    /><br/>
                                    <Radio
                                        label='Female'
                                        name='radioGroup'
                                        value='Female'
                                        onChange={this.handleChange}
                                        checked={this.state.sex === 'Female'}
                                    /><br/>
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

export default SearchResult;
import React, {Component} from 'react';
import '../styles/SearchResult.css'
import { Button, Dropdown, Radio } from "semantic-ui-react";
import Pet from './Pet';
import history from './history';
import CheckBox from './CheckBox';
import { sortOption } from './DropdownOptions';


const parseQueryParameter = q => {
    let qs = q.replace("?", "").split("&")
    let params = {}

    qs.forEach(param => {
        param = param.split("=")
        console.log(param);
        if (param[1] !== "") {
            params[param[0]] = param[1].replaceAll("%20", " ")
        }
    });

    return params
}

class SearchResult extends Component {
    constructor() {
        super();
        this.state = {
            pets: [],
            curpets: [],
            sex: '',
            price: '',
            species: '',
            breed: '',
            location: '',
            ranges: [
                { id: 1, min: 0, max: 100, isChecked: false, value: "Under $100.00", arr: [] },
                { id: 2, min: 100, max: 500, isChecked: false, value: "$100.00 to $500.00", arr: [] },
                { id: 3, min: 500, max: 1000, isChecked: false, value: "$500.00 to $1000.00", arr: [] },
                { id: 4, min: 1000, max: 1500, isChecked: false, value: "$1000.00 to $1500.00", arr: [] },
                { id: 5, min: 1500, max: 3000, isChecked: false, value: "$1500.00 to $3000.00", arr: [] },
                { id: 6, min: 3000, max: 1000000000, isChecked: false, value: "Above $3000.00", arr: [] }
            ]
        }
    }
    
    componentDidMount() {
        if (this.props.location.state === undefined) {
            console.log("search from the home page");

            let params = parseQueryParameter(this.props.location.search)
            console.log(params);
            if (params.species !== undefined) {
                this.state.species = params.species;
            }
            if (params.breed !== undefined) {
                this.state.breed = params.breed;
            }
            if (params.location !== undefined) {
                this.state.location = params.location;
            }
            if (params.sex !== undefined) {
                this.state.sex = params.sex;
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
                    this.state.ranges.map((range) => {
                        const res = data.filter(pet => pet.price >= range.min && pet.price < range.max);
                        range.arr = res;
                    })
                    this.setState({pets: data});
                    this.setState({curpets: data});
                }
            })
            .catch(err => {
                this.setState({err: err.message});
            })
        } else {
            console.log("passed state are: ", this.props.location.state);
            let params = parseQueryParameter(this.props.location.search)
            console.log("here is the params", params);
            if (params.species !== undefined) {
                this.state.species = params.species;
            }
            if (params.breed !== undefined) {
                this.state.breed = params.breed;
            }
            if (params.location !== undefined) {
                this.state.location = params.location;
            }
            if (params.sex !== undefined) {
                this.state.sex = params.sex;
            }
            this.setState({pets: this.props.location.state.allpets})
            this.setState({curpets: this.props.location.state.curpets});
            this.setState({ranges: this.props.location.state.ranges});
            console.log("allpets are: ", this.props.location.state.allpets);
            console.log("curpets are: ", this.props.location.state.curpets);
            console.log("ranges are: ", this.props.location.state.ranges);
        }
    }

    handleChange = (e, { value }) => {
        this.setState({sex: value});
    }

    uncheck = (e) => {
        this.setState({sex: ''});
    }

    submitHandler = (e) => {
        e.preventDefault();

        let array = [];
        let price = this.state.price;
        let checked = false;
        this.state.ranges.map((range) => {
            console.log("range: ", range.arr);
            if (range.isChecked) {
                checked = true;
                price += range.min + "to" + range.max + "&" + "price=";
                array = [...array, ...range.arr];
            }
        })
        price = price.length === 0 ? price : price.slice(0, -7);

        let res = array.length === 0 & !checked ? this.state.pets : array;
        res = this.state.sex === '' ? res : res.filter(pet => pet.sex === this.state.sex);

        console.log("pets is: ", this.state.pets);
        console.log("res is: ", res);
        history.push({
            pathname: '/search',
            state: {
                allpets: this.state.pets,
                curpets: res,
                ranges: this.state.ranges
            },
            search: `?species=${this.state.species}&breed=${this.state.breed}&location=${this.state.location}&sex=${this.state.sex}&price=${price}`,
        })
        // history.replace(`/search?species=${this.state.species}&breed=${this.state.breed}&location=${this.state.location}&sex=${this.state.sex}&price=${price}`);
    }

    toggle = (event) => {
        let ranges = this.state.ranges
        ranges.forEach(range => {
           if (range.value === event.target.value) 
            range.isChecked =  event.target.checked
        })
        this.setState({ranges: ranges})
    }

    handleSort = (value) => {
        let array = this.state.curpets;
        if (value === "ascending") {
            array.sort((a, b) => a.price > b.price ? 1 : -1);
        } else if (value === "descending") {
            array.sort((a, b) => a.price > b.price ? -1 : 1);
        }
        this.setState({curpets: array});
    }

    render() {
        let pets = this.state.curpets;
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
                                    <h3>Select the Price Range</h3>
                                    <ul>
                                        {
                                            this.state.ranges.map((range) => {
                                                return (<CheckBox toggle={this.toggle} range={range}/>)
                                            })
                                        }
                                    </ul>

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
                                    <div>
                                        <Button onClick={this.uncheck}>Uncheck the Sex</Button>
                                    </div>
                                    <div>
                                        <Button className="search-button" onClick={this.submitHandler}>Search</Button>
                                    </div>
                                    <div>
                                        <Dropdown
                                            onChange={(e, {value}) => this.handleSort(value)}
                                            placeholder="Sort"
                                            selection
                                            options={sortOption}
                                        />
                                    </div>
                                
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
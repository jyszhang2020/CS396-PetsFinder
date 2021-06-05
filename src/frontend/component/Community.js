import React, {Component} from 'react';
import Pet from './Pet';
import { Button, Radio, Dropdown } from "semantic-ui-react";
import history from './history';
import CheckBox from './CheckBox';
import { sortOption } from './DropdownOptions';

import '../styles/Community.css';

class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allpets : [],
            curpets : [],
            sex: '',
            price: '',
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
            this.state.ranges.map((range) => {
                const res = data.filter(pet => pet.price >= range.min && pet.price < range.max);
                range.arr = res;
            })
            this.setState({allpets: data});
            this.setState({curpets: data});
        })  
    }

    handleChange = (e, { value }) => {
        this.setState({sex: value});
    }

    submitHandler = (e) => {
        e.preventDefault();
        let array = [];
        let price = this.state.price;
        this.state.ranges.map((range) => {
            if (range.isChecked) {
                price += range.min + "to" + range.max + "&" + "price=";
                array = [...array, ...range.arr];
            }
        })
        price = price.length === 0 ? price : price.slice(0, -7);
        let res = array.length === 0 ? this.state.allpets : array;
        
        res = this.state.sex === '' ? res : res.filter(pet => pet.sex === this.state.sex);

        this.setState({curpets: res});

        console.log("res: ", res);
        history.push({
            pathname: '/search',
            state: {
                allpets: this.state.allpets,
                curpets: res,
                ranges: this.state.ranges
            },
            search: `?species=&breed=&location=&sex=${this.state.sex}&price=${price}`,
        })
    }

    uncheck = (e) => {
        this.setState({sex: ''});
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
                                    <Dropdown
                                            onChange={(e, {value}) => this.handleSort(value)}
                                            placeholder="Sort"
                                            selection
                                            options={sortOption}
                                        />
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
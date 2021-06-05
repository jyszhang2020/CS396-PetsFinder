import React, {Component} from 'react';
import Pet from './Pet';
import { Button, Radio, Dropdown } from "semantic-ui-react";
import history from './history';
import CheckBox from './CheckBox';
import { sortOption } from './DropdownOptions';

import '../styles/Community.css';

const parseQueryParameter = q => {
    if (q === "")
        return {}

    let qs = q.replace("?", "").split("&")
    let params = {}

    qs.forEach(param => {
        param = param.split("=")
        
        if (param[1] !== "") {
            params[param[0]] = param[1].replaceAll("%20", " ")
        }
        
    });

    return params
}

const joinQueryParameter = params => {
    let res = "?"

    for (let [key, value] of Object.entries(params)) {
        res += key + "=" + value + "&"
    }

    return res.slice(0, -1)
}

class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [],
            curpets: [],
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
        this.fetchPets([]) // fetch all pets
    }

    fetchPets = (params) => {
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
    }

    handleSexChange = (e, { value }) => {
        this.setState({sex: value});
        let params = parseQueryParameter(this.props.location.search)
        params['sex'] = value
        this.props.history.push(this.props.location.pathname + joinQueryParameter(params))
        this.fetchPets(params)
    }

    uncheck = (e) => {
        this.setState({sex: ''});
        let params = parseQueryParameter(this.props.location.search)
        delete params['sex'];
        this.props.history.push(this.props.location.pathname + joinQueryParameter(params))
        this.fetchPets(params)
    }

    toggle = (event) => {
        let ranges = this.state.ranges
        let queryRange = []
        ranges.forEach(range => {
            if (range.value === event.target.value) {
                range.isChecked =  event.target.checked
            }
            if (range.isChecked) {
                queryRange.push(range.min + "-" + range.max)
            }
        })
        this.setState({ranges: ranges})

        let params = parseQueryParameter(this.props.location.search)
        delete params['price']
        if (queryRange.length !== 0)
            params['price'] = queryRange.join(",")
        this.props.history.push(this.props.location.pathname + joinQueryParameter(params))
        this.fetchPets(params)
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
                                    <div className="price-checkbox">
                                        {
                                            this.state.ranges.map((range) => {
                                                return (<CheckBox toggle={this.toggle} range={range}/>)
                                            })
                                        }
                                    </div>

                                    <h3>Choose the Sex</h3>
                                    <Radio
                                        label='Male'
                                        name='radioGroup'
                                        value='Male'
                                        onChange={this.handleSexChange}
                                        checked={this.state.sex === 'Male'}
                                    /><br/>
                                    <Radio
                                        label='Female'
                                        name='radioGroup'
                                        value='Female'
                                        onChange={this.handleSexChange}
                                        checked={this.state.sex === 'Female'}
                                    /><br/><br/>
                                    <div>
                                        <Button onClick={this.uncheck}>Clear Sex</Button>
                                    </div>
                                    <h3>Sort Price</h3>
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
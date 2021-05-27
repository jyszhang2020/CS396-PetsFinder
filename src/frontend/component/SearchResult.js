import React, {Component} from 'react';
import '../styles/SearchResult.css'
import Pet from './Pet';

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
    componentDidMount() {
        let params = parseQueryParameter(this.props.location.search)
        
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

    constructor() {
        super();
        this.state = {
            pets: []
        }
    }

    render() {
        const pets = this.state.pets;
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
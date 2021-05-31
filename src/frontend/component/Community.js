import React, {Component} from 'react';
import Pet from './Pet';
import PetDetail from './PetDetail';

class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allpets : []
        }
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
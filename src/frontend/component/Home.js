import React, {Component} from 'react';
import '../styles/Home.css';
import CatImg from '../assets/cat-background.jpg';
import 'semantic-ui-css/semantic.min.css'
import {catBreedOption, dogBreedOption, locationOption} from './DropdownOptions';
import SearchBox from './SearchBox'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Input } from 'semantic-ui-react'
import history from './history';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const goToCarddetails = (pet) => {
    console.log("here");
    localStorage.setItem("selectedPetID", pet._id);
// you can manage here to pass the clicked card id to the card details page if needed
}

class Home extends Component {
    constructor() {
        super();
        this.state = {
            species: '',
            breed: '',
            sex: '',
            location: '',
            err: '',
            email: '',
            featuredPets: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8081/randompets", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({featuredPets: data})
                console.log(data)
            })
            .catch(err => {
                this.setState({err: err.message});
            })
    }

    handleChange = (value, state) => {
        this.setState({[state]: value})
    }

    getOptions = keyword => {
        if (keyword === "breed") {
            if (this.state.species === "Cat") {
                return catBreedOption
            } else if (this.state.species === "Dog") {
                return dogBreedOption
            }
        } else if (keyword === "location") {
            return locationOption
        }

        return []
    }

    submitHandler = (e) => {
        e.preventDefault();

        history.push({
            pathname: '/search',
            search: `?species=${this.state.species}&breed=${this.state.breed}&location=${this.state.location}`,
        })
    }

    handleSubmitEmail = () => {
        fetch('http://localhost:8081/submitemail', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            }
        })
            .then((response) => response.text())
            .then((response) => {
                if (response === 'success') {
                    console.log(response)
                    alert("You have already joined our mailing list!")
                }
                else {
                    alert("Email submission failed. Please try again later.")
                }
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div>
                <div id="img-container">
                    <img id="background-img" src={CatImg} alt="tabby cat lying on bed"/>
                    <div id="text-line-one">Looking for a furrever friend?</div>
                    <div id="text-line-two">Start a search on PetsFind!</div>
                </div>
                <SearchBox
                    handleChange={this.handleChange}
                    getOptions={this.getOptions}
                    submitHandler={this.submitHandler}
                />
                <div id="carousel-container">
                    <h2 id="carousel-header"> Featured Pets </h2>
                    <Carousel responsive={responsive}>
                        {this.state.featuredPets.map(pet => (
                            <div className="pet-carousel" key={pet._id}>
                                <div className="pet-carousel-card" onClick={() => {
                                            goToCarddetails(pet)
                                            history.push('/allpets/' + pet._id);
                                            }}>
                                    <div class="pet-img-container">
                                        <img class="pet-img" src={pet.image_url} alt=""/>
                                    </div>
                                    <div className="pet-card-info">
                                        <div className="pet-card-name"> {pet.name} </div>
                                        <div className="pet-card-detail"> {pet.breed ? pet.breed : "No breed info"} </div>
                                        <div className="pet-card-detail"> ${pet.price} </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div id="mailing-list">
                    <div id="mailing-list-header"> Join Our Mailing List! </div>
                    <div id="mailing-list-subheader"> Get Notified When a Pet is Available </div>
                    <Input action={{content: 'Submit', onClick: this.handleSubmitEmail}} placeholder='Your Email Address...' onChange={(e, {value}) => this.handleChange(value, "email")}/>
                </div>
            </div>
        )
    }
}

export default Home;
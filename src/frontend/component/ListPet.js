import React, {Component} from 'react';
import '../styles/ListPet.css';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'
import {speciesOption, genderOption} from './DropdownOptions';
import {catBreedOption, dogBreedOption, locationOption} from './DropdownOptions';
import {storage} from '../../firebase/firebase'
import history from './history';

class ListPet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            species: '',
            breed: '',
            name: '',
            sex: '',
            dob: '',
            price: '',
            contact_phone: '',
            detail: '',
            image: '',
            location: '',
            
            term_condition: false,
            name_error: false,
            species_error: false,
            sex_error: false,
            dob_error: false,
            price_error: false,
            detail_error: false,
            contact_phone_error: false,
            location_error: false,
            term_condition_error: false,
        }
    }

    handleChange = (value, state) => {
        this.setState({
            [state]: value,
            [state + "_error"]: false,
        })
    }

    handleChangeImage = e => {
        this.setState({
            image: e.target.files[0]
        })
    }

    isDOBValid = () => {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(!this.state.dob.match(regEx)) return false;  // Invalid format
        var d = new Date(this.state.dob);
        var dNum = d.getTime();
        if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0,10) === this.state.dob;
    }

    isPriceValid = () => {
        return !isNaN(this.state.price) && !isNaN(parseInt(this.state.price))
    }

    isContactValid = () => {
        let valid = true

        if (this.state.contact_phone.length !== 10) {
            valid = false
        }

        for (var i = 0; i < this.state.contact_phone.length; i++) {
            if (isNaN(this.state.contact_phone[i]) || isNaN(parseInt(this.state.contact_phone[i]))) {
                valid = false
            }
        }
         

        return valid
    }

    validateForm = () => {
        let err = false

        if (this.state.name === '') {
            this.setState({name_error: true})
            
            err = true
        }
        if (this.state.species === '') {
            this.setState({species_error: true})
            
            err = true
        }
        if (this.state.sex === '') {
            this.setState({sex_error: true})
            
            err = true
        }
        if (this.state.dob === '' || !this.isDOBValid()) {
            this.setState({dob_error: true})
            
            err = true
        }
        if (this.state.price === '' || !this.isPriceValid()) {
            this.setState({price_error: true})
            
            err = true
        }
        if (this.state.detail === '') {
            this.setState({detail_error: true})
            
            err = true
        }
        if (this.state.contact_phone === '' || !this.isContactValid()) {
            this.setState({contact_phone_error: true})
            
            err = true
        }
        if (this.state.location === '') {
            this.setState({location_error: true})
            
            err = true
        }
        if (this.state.term_condition === false) {
            this.setState({
                term_condition_error: true
            })

            err = true
        }

        return !err
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.validateForm()) {
            const uploadTask = storage.ref(`/images/${this.state.name}_${this.state.contact_phone}`).put(this.state.image)
            uploadTask.on('state_changed', 
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot)
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    // gets the functions from storage refences the image storage in firebase by the children
                    // gets the download url then sets the image from firebase as the value for the imgUrl key:
                    storage.ref('images').child(`${this.state.name}_${this.state.contact_phone}`).getDownloadURL()
                    .then(fireBaseUrl => {
                        fetch('http://localhost:8081/listpet', {
                            method: 'POST',
                            body: JSON.stringify({
                                species: this.state.species,
                                breed: this.state.breed,
                                name: this.state.name,
                                sex: this.state.sex,
                                dob: this.state.dob,
                                price: this.state.price,
                                contact_phone: this.state.contact_phone,
                                detail: this.state.detail,
                                image_url: fireBaseUrl,
                                location: this.state.location,
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
                            }
                        })
                            .then(async response => {
                                if (response.status === 201) {
                                    let pet = await response.json()
                                    console.log(pet)
                                    localStorage.setItem("selectedPetID", pet._id);
                                    history.push('/allpets/' + pet._id)
                                }
                                else {
                                    alert("Submit failed")
                                }
                            })
                            .catch((err) => console.log(err))
                    })
                })
        }
    }

    getBreedOptions = () => {
        if (this.state.species === "Cat") {
            return catBreedOption
        } else if (this.state.species === "Dog") {
            return dogBreedOption
        }

        return []
    }

    render() {
        return (
            <div id="smallest-page-container">
                <h1 className="title">
                    Having a pet to sell? List your pet here!
                </h1>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            label='Pet Name'
                            onChange={(event, {value}) => this.handleChange(value, "name")}
                            placeholder='e.g. Max'
                            error={this.state.name_error}
                        />
                        <Form.Field
                            control={Select}
                            label='Pet Species'
                            options={speciesOption}
                            onChange={(event, {value}) => this.handleChange(value, "species")}
                            placeholder='e.g. Cat'
                            error={this.state.species_error}
                        />
                        <Form.Field
                            control={Select}
                            options={this.getBreedOptions()}
                            label='Pet Breed'
                            onChange={(event, {value}) => this.handleChange(value, "breed")}
                            placeholder='e.g. Ragdoll'
                            search
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Select}
                            label='Pet Sex'
                            options={genderOption}
                            onChange={(event, {value}) => this.handleChange(value, "sex")}
                            placeholder='e.g. Male'
                            error={this.state.sex_error}
                        />
                        <Form.Field
                            control={Input}
                            label='Pet DOB (YYYY-MM-DD)'
                            onChange={(event, {value}) => this.handleChange(value, "dob")}
                            placeholder='e.g. 2021-02-03'
                            error={this.state.dob_error}
                        />
                        <Form.Field
                            control={Input}
                            label='Pet Price ($)'
                            onChange={(event, {value}) => this.handleChange(value, "price")}
                            placeholder='e.g. 1500'
                            error={this.state.price_error}
                        />
                    </Form.Group>
                    <Form.Field
                        control={TextArea}
                        label='Details about the pet'
                        onChange={(event, {value}) => this.handleChange(value, "detail")}
                        placeholder='e.g. temperament, parents...'
                        error={this.state.detail_error}
                    />
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            label='Contact Number'
                            onChange={(event, {value}) => this.handleChange(value, "contact_phone")}
                            placeholder='e.g. 2179792367'
                            error={this.state.contact_phone_error}
                        />
                        <Form.Field
                            control={Select}
                            label='Location'
                            options={locationOption}
                            onChange={(event, {value}) => this.handleChange(value, "location")}
                            search
                            placeholder='e.g. Illinois'
                            error={this.state.location_error}
                        />
                    </Form.Group>
                    <Form.Field
                        label='Image'
                    />
                    <input type="file" name="file" id="input-file" onChange={this.handleChangeImage} />
                    <Form.Checkbox
                        label='I agree to the Terms and Conditions'
                        onChange={(event, {checked}) => this.handleChange(checked, "term_condition")}
                        error={this.state.term_condition_error}
                    />
                    <Form.Field
                        id='list-pet-submit-button'
                        control={Button}
                        content='Submit'
                        onClick={this.handleSubmit}
                    />
                </Form>
            </div>
        )
    }
}

export default ListPet;
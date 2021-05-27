import React, {Component} from 'react';
import '../styles/ListPet.css';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'
import {speciesOption, genderOption} from './DropdownOptions';
import {catBreedOption, dogBreedOption, locationOption} from './DropdownOptions';

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
            image_url: '',
            location: '',
            
            term_condition: false,
            name_error: false,
            species_error: false,
            breed_error: false,
            sex_error: false,
            dob_error: false,
            price_error: false,
            detail_error: false,
            contact_phone_error: false,
            location_error: false,
            image_url_error: false,
            term_condition_error: false,
        }
    }

    handleChange = (value, state) => {
        this.setState({
            [state]: value,
            [state + "_error"]: false,
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
        if (this.state.breed === '') {
            this.setState({breed_error: true})
            
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
        if (this.state.image_url === '') {
            this.setState({image_url_error: true})
            
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
        console.log(this.state);

        if (this.validateForm()) {
            fetch('http://localhost:8081/listpet', {
                method: 'POST',
                body: JSON.stringify(this.state),
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
                        alert("Submit Success!")
                    }
                    else {
                        alert("Submit failed")
                    }
                })
                .catch((err) => console.log(err))
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
                            error={this.state.breed_error}
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
                            placeholder='e.g. Illinois'
                            error={this.state.location_error}
                        />
                    </Form.Group>
                    <Form.Field
                        id='form-input-control-error-email'
                        control={Input}
                        label='Image URL'
                        onChange={(event, {value}) => this.handleChange(value, "image_url")}
                        placeholder='paste pet image url here'
                        error={this.state.image_url_error}
                    />
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
import React, {Component} from 'react';
import '../styles/SearchBox.css';
import { Dropdown, Icon, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {speciesOption} from './DropdownOptions';

class SearchBox extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div id="search-panel">
                <h2>Find a Pet</h2>
                <div id="search-bar">
                    <Dropdown
                        placeholder='Species'
                        selection
                        closeOnChange
                        options={speciesOption}
                        onChange={(e, {value}) => this.props.handleChange(value, "species")}
                    />
                    <Icon name='angle right' size='big' color='grey'/>
                    <Dropdown
                        placeholder='Breed'
                        selection
                        closeOnChange
                        search
                        options={this.props.getOptions("breed")}
                        onChange={(e, {value}) => this.props.handleChange(value, "breed")}
                    />
                    <Icon name='angle right' size='big' color='grey'/>
                    <Dropdown
                        placeholder='Location'
                        selection
                        closeOnChange
                        search
                        options={this.props.getOptions("location")}
                        onChange={(e, {value}) => this.props.handleChange(value, "location")}
                    />
                    <Button className="search-button" onClick={this.props.submitHandler}>Search</Button>
                </div>
            </div>
        )
    }
}

export default SearchBox;
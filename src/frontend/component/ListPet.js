import React, {Component} from 'react';
import '../styles/ListPet.css';

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
            location: '',
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handlerSubmit = (e) => {
        e.preventDefault()
        console.log(this.state);

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

    render() {
        return (
            <div>
                <form>
                    <div className="title">
                        List a pet here
                    </div>
                    <div className="form">
                        {/* species */}
                        <div className="Box_title">
                            <span>Species</span>
                        </div>
                        <input type="text" name="species"

                               onChange={this.changeHandler}
                               className="input"/>
                        {/* breed */}
                        <div className="Box_title">
                            <span>Breed</span>
                        </div>
                        <input type="text" name="breed"
                               onChange={this.changeHandler}
                               className="input"/>
                        {/* name */}
                        <div className="Box_title">
                            <span>Name</span>
                        </div>
                        <input type="text" name="name"
                               onChange={this.changeHandler}
                               className="input"/>
                        {/* sex */}
                        <div className="Box_title">
                            <span>Sex</span>
                        </div>
                        <input type="text" name="sex"
                               onChange={this.changeHandler}
                               className="input"/>
                        {/* dob */}
                        <div className="Box_title">
                            <span>DOB</span>
                        </div>
                        <input type="text" name="dob"
                               onChange={this.changeHandler}
                               className="input"/>
                        {/* price */}
                        <div className="Box_title">
                            <span>Price</span>
                        </div>
                        <input type="text" name="price"
                               onChange={this.changeHandler}
                               className="input"/>
                        {/* contact_phone */}
                        <div className="Box_title">
                            <span>Phone</span>
                        </div>
                        <input type="text" name="phone"
                               onChange={this.changeHandler}
                               className="input"/>
                        {/* location */}
                        <div className="Box_title">
                            <span>Location</span>
                        </div>
                        <input type="text" name="location"
                               onChange={this.changeHandler}
                               className="input"/>
                        </div>
                        {/* detail */}
                        <div className="form">
                            <div className="Box_title">
                                <span>Detail</span>
                            </div>
                            <input
                                type="text" name="detail"
                                onChange={this.changeHandler}
                                className="input"
                            />
                        </div>
                        <button type="submit"
                                onClick={this.handlerSubmit}
                                className="button"
                        >Submit</button>
                </form>
            </div>
        )
    }
}

export default ListPet;
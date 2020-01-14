import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';

class BreweryForm extends Component {

    state = {
        name: '',
        bio: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        id: this.props.user.id
    };

    addBrewery = (event) => {
        event.preventDefault();
        console.log(this.state)
        this.props.dispatch({ type: 'ADD_BREWERY', payload: this.state });
        this.setState({
            name: '',
            bio: '',
            street: '',
            city: '',
            state: '',
            zip: '',
        })

    } 

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            <Fragment>
                <h2>Enter Your Brewery:</h2>
                <form onSubmit={this.addBrewery}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            label="name"
                            placeholder="name"
                            value={this.state.name}
                            onChange={this.handleInputChangeFor('name')}
                        />
                    </div>
                    <div>
                        <textarea
                            type="text"
                            name="bio"
                            rows="4"
                            label="bio"
                            placeholder="bio"
                            value={this.state.bio}
                            onChange={this.handleInputChangeFor('bio')}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="street"
                            label="street"
                            placeholder="street"
                            value={this.state.street}
                            onChange={this.handleInputChangeFor('street')}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="city"
                            label="city"
                            placeholder="city"
                            value={this.state.city}
                            onChange={this.handleInputChangeFor('city')}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="state"
                            label="state"
                            placeholder="state"
                            value={this.state.state}
                            onChange={this.handleInputChangeFor('state')}
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="zip"
                            label="zip"
                            placeholder="zip"
                            value={this.state.zip}
                            onChange={this.handleInputChangeFor('zip')}
                        />
                    </div>
                    <div>
                        <button type="submit" name="submit">
                            Add Brewery
                        </button>
                    </div>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  });
  
export default connect(mapStateToProps)(BreweryForm);

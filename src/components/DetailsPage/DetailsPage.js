import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class DetailsPage extends Component {

    state = {
        id: this.props.imageReducer[0].id,
        name: this.props.imageReducer[0].brewery_name,
        bio: this.props.imageReducer[0].bio,
        street: this.props.imageReducer[0].street,
        city: this.props.imageReducer[0].city,
        state: this.props.imageReducer[0].state,
        zip: this.props.imageReducer[0].zip,
        edit: false,
    }

    componentDidMount() {
        this.props.dispatch({type: 'GET_BREWERY_COMMENTS', payload: this.props.imageReducer[0].id});
    }
    goBack = () => {
        this.props.history.push(`/home`);
    }

    editDetails = () => {
        if(this.state.edit === false){
            this.setState({
                edit: true
            })
        } else {
            this.props.dispatch({type: 'EDIT_BREWERY_DETAILS', payload: this.state})
            this.setState({
                edit: false
            })
        }
    }

    cancel = () => {
        this.setState({
            edit: false
        })
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
        console.log(event.target.value)
    };

    render() {

        const editDetails = this.state.edit === false  ? (
            <Fragment>
                <h2>My Brewery Details:</h2>
                <p>{this.props.imageReducer[0].brewery_name}</p>
                <p>{this.props.imageReducer[0].bio}</p>
                <p>{this.props.imageReducer[0].street}</p>
                <p>{this.props.imageReducer[0].city}</p>
                <p>{this.props.imageReducer[0].state}</p>
                <p>{this.props.imageReducer[0].zip}</p>
                <button onClick={this.editDetails}>Edit Details</button>
            </Fragment>
            ) : ( 
                <Fragment>
                    <h2>Edit your Details:</h2>
                        <div>
                            <input
                                type="text"
                                name="name"
                                label="Name of brewery"
                                variant="outlined"
                                value={this.state.name}
                                onChange={this.handleInputChangeFor('name')}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="bio"
                                rows="4"
                                variant="outlined"
                                label="Enter a short bio"
                                value={this.state.bio}
                                onChange={this.handleInputChangeFor('bio')}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="street"
                                label="Street"
                                variant="outlined"
                                value={this.state.street}
                                onChange={this.handleInputChangeFor('street')}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="city"
                                label="city"
                                variant="outlined"
                                value={this.state.city}
                                onChange={this.handleInputChangeFor('city')}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="state"
                                label="State"
                                variant="outlined"
                                value={this.state.state}
                                onChange={this.handleInputChangeFor('state')}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="zip"
                                label="Zip"
                                variant="outlined"
                                value={this.state.zip}
                                onChange={this.handleInputChangeFor('zip')}
                            />
                        </div>
                    <button onClick={this.cancel}>Cancel</button>
                    <button onClick={this.editDetails}>Save</button>
                </Fragment>
            );

        return (
            <Fragment>
            <div>
                {editDetails}
            </div>
            <div>
                <h2>What are they Saying?</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.commentsReducer.map((item, i) => {
                                return (
                                <tr key={item.comment_id}>
                                    <td>{item.username}</td>
                                    <td>{item.comment_body}</td>
                                </tr>
                                )})
                            }
                    </tbody>
                </table>
                <button onClick={this.goBack}>Back</button>
            </div>
            </Fragment>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    imageReducer: reduxStore.imageReducer,
    commentsReducer: reduxStore.commentsReducer
});

export default connect(putReduxStateOnProps)(DetailsPage);
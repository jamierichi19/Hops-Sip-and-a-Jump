import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

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

    }; 

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    handleFinishedUpload = info => {
        // console.log('File uploaded with filename', info.filename)
        console.log('Access it on s3 at', info.fileUrl)
        this.props.dispatch({ type: 'POST_IMAGE_URL', payload: info.fileUrl})
    }

    render() {

        const uploadOptions = {
            server: 'http://localhost:5000',
            // signingUrlQueryParams: {uploadType: 'avatar'},
        }

        const s3Url = 'https://jamiebucket19.s3.amazonaws.com'

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
                <div>
                <DropzoneS3Uploader
                onFinish={this.handleFinishedUpload}
                s3Url={s3Url}
                maxSize={1024 * 1024 * 5}
                upload={uploadOptions}
                />
                </div>
                <hr />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  });
  
export default connect(mapStateToProps)(BreweryForm);

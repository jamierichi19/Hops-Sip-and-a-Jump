import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyBreweries extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'GET_BREWERY_IMAGE'});
    }

    render() {
        return (
            <>
            <h2>My Breweries:</h2>
            {this.props.imageReducer.map((item, i) => {
                return (
                <img key={item.id} src={item.image_url} alt={item.id} width="25%" height="25%" />
                )})
            }
            </>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    imageReducer: reduxStore.imageReducer
})

export default connect(putReduxStateOnProps)(MyBreweries);
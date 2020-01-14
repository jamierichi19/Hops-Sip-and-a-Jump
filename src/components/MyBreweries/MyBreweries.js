import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MyBreweries extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'GET_BREWERY_IMAGE'});
    }

    render() {
        return (
            <>
            <h2>My Breweries:</h2>
            <Link to="/details">
                {this.props.imageReducer.map((item, i) => {
                    return (
                    <img key={item.id} src={item.image_url} alt={item.id} width="25%" height="25%" />
                    )})
                }
            </Link>
            <hr />
            </>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    imageReducer: reduxStore.imageReducer
});

export default connect(putReduxStateOnProps)(MyBreweries);
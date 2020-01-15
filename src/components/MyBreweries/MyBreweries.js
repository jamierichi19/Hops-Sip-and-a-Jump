import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MyBreweries extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'GET_BREWERY_IMAGE'});
    }

    deleteItem = (id) => {
        this.props.dispatch({type: 'DELETE_BREWERY', payload: id})
    }

    render() {
        return (
            <>
            <h2>My Breweries:</h2>
                {this.props.imageReducer.map((item, i) => {
                    return (
                        <div key={item.id}>
                        <Link to="/details">
                            <img  src={item.image_url} alt={item.id} width="25%" height="25%" />
                        </Link>
                        <button onClick={() => this.deleteItem(item.id)}>Remove</button>
                        </div>
                    )})
                }
            <hr />
            </>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    imageReducer: reduxStore.imageReducer
});

export default connect(putReduxStateOnProps)(MyBreweries);
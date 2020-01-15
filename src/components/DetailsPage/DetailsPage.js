import React, { Component } from 'react';
import { connect } from 'react-redux';

class DetailsPage extends Component {
    render() {
        return (
            <div>
                {/* <p>test</p> */}
                {JSON.stringify(this.props.details)}
                {this.props.imageReducer.map((item, i) => {
                    return (
                    <div key={item.id}>
                        <img src={item.image_url} alt={item.id} width="25%" height="25%" />
                        <p>{item.brewery_name}</p>
                        <p>{item.bio}</p>
                        <p>{item.street}</p>
                        <p>{item.city}</p>
                        <p>{item.state}</p>
                        <p>{item.zip}</p>
                    </div>
                    )})
                }
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    imageReducer: reduxStore.imageReducer
});

export default connect(putReduxStateOnProps)(DetailsPage);
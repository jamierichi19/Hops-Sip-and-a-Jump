import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class DetailsPage extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'GET_BREWERY_COMMENTS', payload: this.props.imageReducer[0].id});
    }

    render() {
        return (
            <Fragment>
            <div>
                <p>{this.props.imageReducer[0].brewery_name}</p>
                <p>{this.props.imageReducer[0].bio}</p>
                <p>{this.props.imageReducer[0].street}</p>
                <p>{this.props.imageReducer[0].city}</p>
                <p>{this.props.imageReducer[0].state}</p>
                <p>{this.props.imageReducer[0].zip}</p>
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
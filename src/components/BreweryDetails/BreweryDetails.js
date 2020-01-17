import React, { Component } from 'react';
import { connect } from 'react-redux';

class BreweryDetails extends Component {


    render() {
        return (
            <div>
                <h2>Brewery Details</h2>
                <div>
                {this.props.detailsReducer.map((item) => {
                    return (
                        <div key={item.id}>
                            <img src={item.image_url} alt={item.id} />
                            <h3>{item.brewery_name}</h3>
                            <div>{item.bio}</div>
                            <div>{item.street}</div>
                            <div>{item.city} {item.state}, {item.zip}</div>
                        </div>
                    )})
                }
                </div>
                <div>
                    <input placeholder="Leave a comment..."/>
                    <button>Add Comment</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.commentsReducer.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.username}</td>
                                        <td>{item.comment_body}</td>
                                    </tr>
                                    
                                )})
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    detailsReducer: reduxStore.detailsReducer,
    commentsReducer: reduxStore.commentsReducer
  });

export default connect(putReduxStateOnProps)(BreweryDetails);

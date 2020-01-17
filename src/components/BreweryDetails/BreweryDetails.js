import React, { Component } from 'react';
import { connect } from 'react-redux';

class BreweryDetails extends Component {

    state = {
        comment: '',
        breweryId: '',
        
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
          breweryId: this.props.detailsReducer.id
        });
        console.log(event.target.value)
    }

    addComment = (id) => {
        this.props.dispatch({ type: 'ADD_COMMENT', payload: this.state})
        this.props.dispatch({ type: 'GET_BREWERY_COMMENTS', payload: id})
    }

    render() {
        return (
            <div>
                <h2>Brewery Details</h2>
                <div>
                <img src={this.props.detailsReducer.image_url} alt={this.props.id}/>
                <h3>{this.props.detailsReducer.brewery_name}</h3>
                <div>{this.props.detailsReducer.bio}</div>
                <div>{this.props.detailsReducer.street}</div>
                <div>{this.props.detailsReducer.city} {this.props.detailsReducer.state}, {this.props.detailsReducer.zip}</div>
                </div>
                <div>
                    <input 
                        placeholder="Leave a comment..."
                        value={this.state.comment}
                        onChange={this.handleInputChangeFor('comment')}
                    />
                    <button  onClick={() => this.addComment(this.state.breweryId)}>Add Comment</button>
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
                                    <tr key={item.comment_id}>
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
    commentsReducer: reduxStore.commentsReducer,
  });

export default connect(putReduxStateOnProps)(BreweryDetails);

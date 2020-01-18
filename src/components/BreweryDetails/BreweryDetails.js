import React, { Component } from 'react';
import { connect } from 'react-redux';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles =  {
    pageTitleCenter: {
        margin: '20px auto 20px auto',
        textAlign: 'center'
    },
    button: {
      marginBottom: '10px',
      marginLeft: '55px',
      marginTop: '10px'
    },
    card: {
        width: 300,
        height: 280,
        textAlign: 'center',
        marginTop: 20
    },
    textField: {
      marginBottom: '10px',
      width: 200,
    },
    button: {
      marginBottom: '10px',
      marginLeft: '20px',
      marginTop: '10px'
    },
    container: {
      textAlign: 'center'
    }
    
  };

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

        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h2" className={classes.pageTitleCenter}>
                    Brewery Details
                </Typography>
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

export default connect(putReduxStateOnProps)(withStyles(styles)(BreweryDetails));

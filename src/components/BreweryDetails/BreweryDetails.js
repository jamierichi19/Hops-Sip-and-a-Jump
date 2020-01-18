import React, { Component } from 'react';
import { connect } from 'react-redux';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
        height: 300,
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
    },
    media: {
        height: 140
      },
    table: {
    width: 700,
    },
    tableCard: {
        textAlign: 'center',
        width: 750,
    },
    
  };

class BreweryDetails extends Component {

    state = {
        comment: '',
        breweryId: '',
        liked: false
        
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
          breweryId: this.props.detailsReducer.id
        });
    }

    addComment = (id) => {
        this.props.dispatch({ type: 'ADD_COMMENT', payload: this.state})
        this.props.dispatch({ type: 'GET_BREWERY_COMMENTS', payload: id})
    }

    likeBrewery = (id) => {
        this.setState({
            liked: true,
        })
        this.props.dispatch({type: 'LIKE_BREWERY', payload: {id: id }})
    }

    unlikeBrewery = (id) => {
        this.setState({
            liked: false
        })
        this.props.dispatch({type: 'UNLIKE_BREWERY', payload: id })
    }

    render() {

        const { classes } = this.props;

        const likeBrewery = this.state.liked === false  ? (
            <div className={classes.container}>
                <button onClick={() => this.likeBrewery(this.props.detailsReducer.id)}>Like</button>
            </div>
          ) : ( 
            <div className={classes.container}>
                <button onClick={() => this.unlikeBrewery(this.props.detailsReducer.id)}>Unlike</button>
            </div>
          );

        return (
            <div>
                <Typography variant="h2" className={classes.pageTitleCenter}>
                    Brewery Details
                </Typography>
                <Grid 
                    container           
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '50vh' }}>
                    <Grid>
                        <Card className={classes.card}>
                            <CardContent>
                                <CardMedia className={classes.media} image={this.props.detailsReducer.image_url} alt={this.props.id}/>
                                <h3>{this.props.detailsReducer.brewery_name}</h3>
                                <div>{this.props.detailsReducer.bio}</div>
                                <div>{this.props.detailsReducer.street}</div>
                                <div>{this.props.detailsReducer.city} {this.props.detailsReducer.state}, {this.props.detailsReducer.zip}</div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {likeBrewery}
                <div className={classes.container}>
                    <TextField 
                        variant="outlined"
                        label="Leave a comment..."
                        className={classes.textField}
                        value={this.state.comment}
                        onChange={this.handleInputChangeFor('comment')}
                    />
                    <Button 
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => this.addComment(this.state.breweryId)}
                        >
                        Add Comment
                    </Button>
                    <Grid
                    container           
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '50vh' }}>
                        <Grid item>
                            <Card className={classes.tableCard}>
                                <CardContent>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Username</TableCell>
                                                <TableCell>Comments</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.props.commentsReducer.map((item) => {
                                                return (
                                                    <TableRow key={item.comment_id}>
                                                        <TableCell>{item.username}</TableCell>
                                                        <TableCell>{item.comment_body}</TableCell>
                                                    </TableRow>
                                                    
                                                )})
                                            }
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
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

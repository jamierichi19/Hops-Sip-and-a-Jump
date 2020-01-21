import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

const styles =  {
    card: {
      minWidth: 275,
      width: 300,
      textAlign: 'center',
    },
    tableCard: {
        textAlign: 'center',
        width: 750,
    },
    pageTitle: {
      margin: '20px auto 20px auto',
      textAlign: 'center'
    },
    textField: {
      marginBottom: '10px',
      marginTop: '10px',
      width: 200,
    },
    button: {
      marginBottom: '10px',
      marginTop: '15px'
    },
    center: {
      textAlign: 'center',
      marginTop: '20px'
    },
    buttonSpacingLeft: {
        marginLeft: '2.5px'
    },
    buttonSpacingRight: {
        marginRight: '2.5px'
    },
    table: {
        width: 700,
    },
    container: {
        textAlign: 'center'
    }
  };

class DetailsPage extends Component {

    state = {
        id: this.props.imageReducer[0].id,
        name: this.props.imageReducer[0].brewery_name,
        bio: this.props.imageReducer[0].bio,
        street: this.props.imageReducer[0].street,
        city: this.props.imageReducer[0].city,
        state: this.props.imageReducer[0].state,
        zip: this.props.imageReducer[0].zip,
        edit: false,
    }

    componentDidMount() {
        this.props.dispatch({type: 'GET_BREWERY_COMMENTS', payload: this.props.imageReducer[0].id});
    }
    goBack = () => {
        this.props.history.push(`/home`);
    }

    editDetails = () => {
        if(this.state.edit === false){
            this.setState({
                edit: true
            })
        } else {
            this.props.dispatch({type: 'EDIT_BREWERY_DETAILS', payload: this.state})
            this.setState({
                edit: false
            })
        }
    }

    cancel = () => {
        this.setState({
            edit: false
        })
    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    render() {

        const { classes } = this.props;

        const editDetails = this.state.edit === false  ? (
            <Fragment>
                <Typography variant="h2" className={classes.pageTitle}>
                    My Brewery Details
                </Typography>
                <Grid
                 container           
                 spacing={4}
                 justify="center"
                >
                    <Grid item>
                        <Card className={classes.card}>
                            <CardContent>
                                <p>{this.props.imageReducer[0].brewery_name}</p>
                                <p>{this.props.imageReducer[0].bio}</p>
                                <div>{this.props.imageReducer[0].street}</div>
                                <br />
                                <div>
                                    {this.props.imageReducer[0].city} {this.props.imageReducer[0].state}, 
                                    {this.props.imageReducer[0].zip}
                                </div>
                                <Button 
                                onClick={this.editDetails}
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                >
                                Edit Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Fragment>
            ) : ( 
                <Fragment>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Edit Brewery Details
                    </Typography>
                    <Grid
                    container           
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '50vh' }}>
                        <Grid item>
                            <Card className={classes.card}>
                                <CardContent>
                                    <div>
                                        <TextField
                                            type="text"
                                            name="name"
                                            label="Name of brewery"
                                            variant="outlined"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleInputChangeFor('name')}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            type="text"
                                            name="bio"
                                            multiline
                                            rows="4"
                                            variant="outlined"
                                            label="Enter a short bio"
                                            className={classes.textField}
                                            value={this.state.bio}
                                            onChange={this.handleInputChangeFor('bio')}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            type="text"
                                            name="street"
                                            label="Street"
                                            variant="outlined"
                                            className={classes.textField}
                                            value={this.state.street}
                                            onChange={this.handleInputChangeFor('street')}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            type="text"
                                            name="city"
                                            label="city"
                                            variant="outlined"
                                            className={classes.textField}
                                            value={this.state.city}
                                            onChange={this.handleInputChangeFor('city')}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            type="text"
                                            name="state"
                                            label="State"
                                            variant="outlined"
                                            className={classes.textField}
                                            value={this.state.state}
                                            onChange={this.handleInputChangeFor('state')}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            type="number"
                                            name="zip"
                                            label="Zip"
                                            variant="outlined"
                                            className={classes.textField}
                                            value={this.state.zip}
                                            onChange={this.handleInputChangeFor('zip')}
                                        />
                                    </div>
                                    <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.buttonSpacingRight}
                                    onClick={this.cancel}
                                    >
                                    Cancel
                                    </Button>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.buttonSpacingLeft}
                                    onClick={this.editDetails}
                                    >
                                    Save
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Fragment>
            );

            const commentsDisplay = this.props.commentsReducer.length > 0  ? (
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
                                            <TableCell>Comment</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.commentsReducer.map((item, i) => {
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
                ) : ( 
                    <div className={classes.container}>
                        <h3>You have zero comments about your brewery yet</h3>
                    </div>
                );

        return (
            <Fragment>
            <div>
                {editDetails}
            </div>
            <div>
                <Typography variant="h2" className={classes.pageTitle}>
                    What Are they Saying?
                </Typography>
                {commentsDisplay}
                <div className={classes.center}>
                    <Button 
                    variant="contained"
                    color="secondary"
                    onClick={this.goBack}
                    >
                    Back
                    </Button>
                </div>
            </div>
            </Fragment>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    imageReducer: reduxStore.imageReducer,
    commentsReducer: reduxStore.commentsReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(DetailsPage));
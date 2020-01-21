import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles =  {
    pageTitle: {
      margin: '20px auto 20px auto'
    },
    pageTitleCenter: {
        margin: '20px auto 20px auto',
        textAlign: 'center'
    },
    button: {
      marginBottom: '10px',
      marginLeft: '55px',
      marginTop: '10px'
    },
    visibleSeperator: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginTop: '30px'
    },
    card: {
        width: 300,
        height: 300,
        textAlign: 'center',
        margin: 'auto'
      },
    removeButton: {
        marginTop: '20px',
        marginRight: '10px'
    },
    spacing: {
        marginBottom: '10px'
    },
    media: {
        height: 140
      },
  };


class MyBreweries extends Component {

    state = {
        open: false
    }

    componentDidMount() {
        this.props.dispatch({type: 'GET_BREWERY_IMAGE'});
    }

    deleteItem = (id) => {
        this.props.dispatch({type: 'DELETE_BREWERY', payload: id})
        this.setState({open: false})
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
    handleClose = () => {
    this.setState({ open: false });
    };

    render() {

        const { classes } = this.props;

        var myBrewerySection = this.props.imageReducer.length < 1 ? 
        <Typography variant="h2" className={classes.pageTitleCenter}>
            Add a Brewery
        </Typography> : (this.props.imageReducer.length <= 1 ? 
            <Typography variant="h2" className={classes.pageTitleCenter}>
                My Brewery
            </Typography> : 
                <Typography variant="h2" className={classes.pageTitleCenter}>
                    My Breweries
                </Typography>);
            

        return (
            <Fragment>
            {myBrewerySection}
            <Grid container spacing={4}>
                {this.props.imageReducer.map((item, i) => {
                    return (
                        <Grid item  key={item.id}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <div className={classes.spacing}>{item.brewery_name}</div>
                                    <Link to="/details">
                                        <CardMedia className={classes.media }image={item.image_url} alt={item.id}  />
                                    </Link>
                                    <br />
                                    <Button
                                        onClick={this.handleClickOpen}
                                        variant="contained"
                                        color="secondary"
                                        className={classes.removeButton}
                                    >
                                    Remove
                                    </Button>
                                    <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    >
                                        <DialogTitle>Are You sure?</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Clicking 'Remove' will remove your brewery information forever.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleClose}>Cancel</Button>
                                            <Button onClick={() => this.deleteItem(item.id)}>Remove</Button>
                                        </DialogActions>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        </Grid>
                    )})
                }
                
            </Grid>
            <hr className={classes.visibleSeperator}/>
            </Fragment>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    imageReducer: reduxStore.imageReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(MyBreweries));
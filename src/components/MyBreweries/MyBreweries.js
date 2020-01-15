import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles =  {
    pageTitle: {
      margin: '20px auto 20px auto'
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
    imageAlign: {
        marginLeft: '250px'
    }
  };


class MyBreweries extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'GET_BREWERY_IMAGE'});
    }

    deleteItem = (id) => {
        this.props.dispatch({type: 'DELETE_BREWERY', payload: id})
    }

    render() {

        const { classes } = this.props;

        return (
            <>
             <Typography variant="h2" className={classes.pageTitle}>
                My Brewery:
            </Typography>
                {this.props.imageReducer.map((item, i) => {
                    return (
                        <div key={item.id} className={classes.imageAlign}>
                        <Link to="/details">
                            <img  src={item.image_url} alt={item.id} width="25%" height="25%" />
                        </Link>
                        <br />
                        <Button
                            onClick={() => this.deleteItem(item.id)}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                        >
                        Remove
                        </Button>
                        </div>
                    )})
                }
            <hr className={classes.visibleSeperator}/>
            </>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
    imageReducer: reduxStore.imageReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(MyBreweries));
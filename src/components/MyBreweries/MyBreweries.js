import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


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
    imageAlign: {
        marginLeft: '250px'
    },
    card: {
        width: 300,
        height: 250,
        textAlign: 'center',
        marginLeft: 550,
      },
    removeButton: {
        marginTop: '20px',
        marginRight: '10px'
    },
    spacing: {
        marginBottom: '10px'
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
             <Typography variant="h2" className={classes.pageTitleCenter}>
                My Brewery
            </Typography>
                {this.props.imageReducer.map((item, i) => {
                    return (
                        <Card key={item.id} className={classes.card}>
                            <CardContent>
                                <div className={classes.spacing}>{item.brewery_name}</div>
                                <Link to="/details">
                                    <img  src={item.image_url} alt={item.id} width="75%" height="75%" />
                                </Link>
                                <br />
                                <Button
                                    onClick={() => this.deleteItem(item.id)}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.removeButton}
                                >
                                Remove
                                </Button>
                            </CardContent>
                        </Card>
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
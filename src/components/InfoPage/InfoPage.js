import React, { Component } from 'react';
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
      margin: 'auto'

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
  
};

class InfoPage extends Component {

  componentDidMount(){
    this.props.dispatch({type: 'GET_FAVORITES'})
  }
  render() {

    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h2" className={classes.pageTitleCenter}>
          My Favorites
        </Typography>
        <Grid container spacing={4} >
                {this.props.favoritesReducer.map((item, i) => {
                    return (
                      <Grid item key={item.id}> 
                          <Card  className={classes.card}>
                            <CardContent>
                                  <div>{item.brewery_name}</div>
                                  <div>{item.city}</div>
                                  <CardMedia className={classes.media}
                                   image={item.image_url} alt={item.id} />
                                  
                                  <Link to="/brewery-details">
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => this.getDetailsAndComments(item.id)}
                                    >
                                      Veiw Details
                                    </Button>
                                  </Link>
                              </CardContent>
                          </Card>
                        </Grid>
                    )})
                }
                </Grid>
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  favoritesReducer: reduxStore.favoritesReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(InfoPage));


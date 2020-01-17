import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

class Search extends Component {

    state = {
        search: ''
    }

    searchBrewery = (event) => {    
        this.props.dispatch({ type: 'SEARCH_BREWERY', payload: this.state });
      } 

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      }
    getDetailsAndComments = (id) => {
      this.props.dispatch({type: 'GET_DETAILS', payload: id});
      this.props.dispatch({type: 'GET_BREWERY_COMMENTS', payload: id});
    }

    render() {
      const { classes } = this.props;
        return (
            <div>
              <Typography variant="h2" className={classes.pageTitleCenter}>
                Search for a brewery
              </Typography>
              <div className={classes.container}>
                <TextField 
                type="text"
                name="search"
                label="Search"
                placeholder="Search"
                variant="outlined"
                className={classes.textField}
                value={this.state.search}
                onChange={this.handleInputChangeFor('search')}
                />
                <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.searchBrewery}
                >
                  Search
                </Button> 
                </div>
                <Grid container spacing={4} >
                {this.props.searchReducer.map((item, i) => {
                    return (
                      <Grid item key={item.id}> 
                          <Card  className={classes.card}>
                            <CardContent>
                                  <div>{item.brewery_name}</div>
                                  <div>{item.city}</div>
                                  <img src={item.image_url} alt={item.id} />
                                  <Link to="/brewery-details">
                                    <Button
                                    variant="contained"
                                    color="primary"
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
  searchReducer: reduxStore.searchReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(Search));

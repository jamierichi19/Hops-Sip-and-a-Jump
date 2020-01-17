import React, { Component } from 'react';
import { connect } from 'react-redux';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import  Grid  from '@material-ui/core/Grid';


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
  
};

class Search extends Component {

    state = {
        search: ''
    }

    searchBrewery = (event) => {    
        this.props.dispatch({ type: 'SEARCH_BREWERY', payload: this.state });
      } // end searchBrewery

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      }

    render() {
      const { classes } = this.props;
        return (
            <div>
              <Typography variant="h2" className={classes.pageTitleCenter}>
                Search for a brewery
              </Typography>
                <input 
                type="text"
                name="search"
                label="Search"
                placeholder="Search"
                // variant="outlined"
                // className={classes.textField}
                value={this.state.search}
                onChange={this.handleInputChangeFor('search')}
                />
                <button onClick={this.searchBrewery}>Search</button> 
                
                {this.props.searchReducer.map((item, i) => {
                    return (
                        <Card key={item.id} className={classes.card}>
                          <CardContent>
                                <div>{item.brewery_name}</div>
                                <div>{item.city}</div>
                                <img src={item.image_url} alt={item.id} />
                                <Button
                                variant="contained"
                                color="primary"
                                >
                                  Veiw Details
                                </Button>
                            </CardContent>
                        </Card>
                    )})
                }
                
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
  searchReducer: reduxStore.searchReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(Search));

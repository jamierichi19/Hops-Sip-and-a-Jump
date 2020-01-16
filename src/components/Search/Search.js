import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        console.log(event.target.value)
      }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}

export default connect()(Search);

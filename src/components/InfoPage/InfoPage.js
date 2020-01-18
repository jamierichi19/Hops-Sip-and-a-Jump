import React, { Component } from 'react';
import { connect } from 'react-redux';

class InfoPage extends Component {

  componentDidMount(){
    this.props.dispatch({type: 'GET_FAVORITES'})
  }
  render() {
    return (
      <div>
        <p>hello</p>
        {JSON.stringify(this.props.favoritesReducer)}
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  favoritesReducer: reduxStore.favoritesReducer
});

export default connect(putReduxStateOnProps)(InfoPage);


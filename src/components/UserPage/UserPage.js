import React, { Component, Fragment }  from 'react';
import { connect } from 'react-redux';
import BreweryForm from '../BreweryForm/BreweryForm';
import MyBreweries from '../MyBreweries/MyBreweries';
import Email from '../Email/Email';
import Search from '../Search/Search'

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

export class UserPage extends Component {

  render() {

    const homePage = this.props.user.type === 'patron'  ? (
      <Fragment>
        <p>Hello, {this.props.user.username}</p>
        <Search />
      </Fragment>
    ) : ( 
    <Fragment>
      <BreweryForm /> 
      <MyBreweries />
      <Email />
    </Fragment>
    );

    return (
      <div>
        {homePage}
      </div>
    )
  }
}



// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

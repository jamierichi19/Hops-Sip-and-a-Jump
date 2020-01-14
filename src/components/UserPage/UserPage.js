import React, { Component }  from 'react';
import { connect } from 'react-redux';
import BreweryForm from '../BreweryForm/BreweryForm'

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

export class UserPage extends Component {
  render() {

    const homePage = this.props.user.type === 'patron'  ? (
    <p>hello {this.props.user.type}</p>
    ) : ( <BreweryForm />);

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

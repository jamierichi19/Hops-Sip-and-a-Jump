import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
// import './Nav.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles =  {
  buttonLeft: {
    float: 'left'
  },
  rightSide: {
    marginTop: '40px'
  },
  test: {
    float: 'right'
  }
};


class Nav extends Component {

  render() {

    const { classes } = this.props;

    const favorites = this.props.user.type === 'patron'  ? (
      <Fragment>
        <Button> 
          <Link className="nav-link" to="/home" style={{textDecoration: "none", color: "#D5D5D5"}}>
            {this.props.user.id ? 'Home' : 'Login / Register'}
          </Link>
        </Button>
        <Button>
          <Link className="nav-link" to="/favorites" style={{textDecoration: "none", color: "#D5D5D5"}}>
            My Favorites
          </Link>
        </Button>
        <LogOutButton className="nav-link"/>
      </Fragment>
    ) : ( 
      <Fragment>
          <Button>
              <Link className="nav-link" to="/home" style={{textDecoration: "none", color: "#D5D5D5"}}>
                {this.props.user.id ? 'Home' : 'Login / Register'}
              </Link>
              </Button>
          <LogOutButton className="nav-link" />
      </Fragment>
    );
    

    return (
      <AppBar>
      <Grid container spacing={4}>
        <Grid item className={classes.buttonLeft} sm={8}>
          <Link to="/home" style={{textDecoration: "none", color: "#D5D5D5"}}>
            <h2 className="nav-title">Hops, Sip, & a Jump</h2>
          </Link>
        </Grid>
        <Grid item sm={4} className={classes.rightSide}>
          <span className={classes.test}>
          {favorites}
          </span>
        </Grid>
      </Grid>
      </AppBar>
    )
  }
}


// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Nav));
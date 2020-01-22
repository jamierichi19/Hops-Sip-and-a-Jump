import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
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
  },
  buttonStyling: {
    textDecoration: 'none',
    color: '#ff8c00'
  }
};

class Nav extends Component {

  render() {

    const { classes } = this.props;

    const favorites = this.props.user.type === 'patron'  ? (
      <Fragment>
        <Button> 
          <Link className={classes.buttonStyling} to="/home" >
            {this.props.user.id ? 'Home' : 'Login / Register'}
          </Link>
        </Button>
        <Button>
          <Link className={classes.buttonStyling} to="/favorites">
            My Favorites
          </Link>
        </Button>
        <LogOutButton className="nav-link"/>
      </Fragment>
    ) : ( 
      <Fragment>
          <Button>
              <Link className={classes.buttonStyling} to="/home">
                {this.props.user.id ? 'Home' : 'Login / Register'}
              </Link>
              </Button>
          <LogOutButton />
      </Fragment>
    );
    
    return (
      <AppBar>
      <Grid container spacing={4}>
        <Grid item className={classes.buttonLeft} sm={8}>
          <Link to="/home" className={classes.buttonStyling} >
            <h2>Hops, Sip, & a Jump</h2>
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

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Nav));
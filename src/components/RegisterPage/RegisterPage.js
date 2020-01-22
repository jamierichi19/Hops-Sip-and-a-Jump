import React, { Component } from 'react';
import {connect} from 'react-redux';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

const styles =  {
  card: {
    minWidth: 275,
    width: 300,
    marginTop: 100,
    textAlign: 'center',
  },
  pageTitle: {
    margin: '20px auto 20px auto'
  },
  textField: {
    marginBottom: '10px',
    width: 200,
  },
  button: {
    marginBottom: '20px'
  },
  topMargin: {
    marginTop: '100px'
  }
};

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    accountType: 'patron'
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          accountType: this.state.accountType
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  onRadioChange = (e) => {
    this.setState({
      accountType: e.target.value
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center">
          <Grid className={classes.topMargin}>
            <Card className={classes.card}>
              <CardContent>
                {this.props.errors.registrationMessage && (
                  <h2
                    className="alert"
                    role="alert"
                  >
                    {this.props.errors.registrationMessage}
                  </h2>
                )}
                <form onSubmit={this.registerUser}>
                <Typography variant="h2" className={classes.pageTitle}>
                  Register
                </Typography>
                  <div>
                    <TextField
                      type="text"
                      name="username"
                      label="Username"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.username}
                      onChange={this.handleInputChangeFor('username')}
                    />
                  </div>
                  <div>
                    <TextField
                      type="text"
                      name="email"
                      label="Email"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.email}
                      onChange={this.handleInputChangeFor('email')}
                    />
                  </div>
                  <div>
                    <TextField
                      type="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      className={classes.textField}
                      value={this.state.password}
                      onChange={this.handleInputChangeFor('password')}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      control={<Radio />}
                      label="Patron"
                      value="patron"
                      checked={this.state.accountType === "patron"}
                      onChange={this.onRadioChange}
                      />
                  </div>
                  <div>
                    <FormControlLabel
                      control={<Radio />}
                      label="Owner"
                      value="owner"
                      checked={this.state.accountType === "owner"}
                      onChange={this.onRadioChange}
                      />
                  </div>
                  <div>
                    <Button
                      className="button"
                      type="submit"
                      name="submit"
                      value="Register"
                      variant="contained"
                      color="primary"
                    >Submit</Button>
                  </div>
                </form>
                <center>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
                  >
                    Already have an account? Login here
                  </button>
                </center>
              </CardContent>
            </Card>
        </Grid>
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));


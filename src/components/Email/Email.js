import React, { Component } from 'react';
import {connect} from 'react-redux';


//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const styles =  {
    form: {
      textAlign: 'center',
    },
    pageTitle: {
      margin: '20px auto 20px auto',
      textAlign: 'center'
    },
    textField: {
      marginBottom: '10px',
      width: 200,
    },
    button: {
      marginBottom: '10px',
      marginTop: '10px'
    }
  };

class Email extends Component {

  state = {
      subject: '',
      body: ''
  }

  // componentDidMount(){
  //   this.props.dispatch()
  // }

  handleInputChangeFor = propertyName => (event) => {
      this.setState({
        [propertyName]: event.target.value,
      });
      console.log(event.target.value)
    }

    getEmailList = (id) => {
      this.props.dispatch({ type: 'GET_EMAIL_LIST', payload: {subject: this.state.subject, body: this.state.body, id: id} })
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h2" className={classes.pageTitle}>
                    Update Your Fans
                </Typography>
                <div>
                    <TextField 
                        type="text"
                        name="subject"
                        label="Subject"
                        className={classes.textField}
                        variant="outlined"
                        value={this.state.subject}
                        onChange={this.handleInputChangeFor('subject')}

                    />
                </div>
                <div>
                    <TextField
                        type="text"
                        multiline
                        rows="10"
                        cols="50"
                        name="body"
                        label="Email Body"
                        variant="outlined"
                        fullWidth	
                        value={this.state.body}
                        onChange={this.handleInputChangeFor('body')}
                    />
                </div>
                <div>
                    <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    onClick={() => this.getEmailList(this.props.imageReducer[0].id)}
                    >
                    Send
                    </Button>
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
  imageReducer: reduxStore.imageReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(Email));

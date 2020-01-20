import React, { Component } from 'react';
import {connect} from 'react-redux';


//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
      body: '',
      open: false
  }

  handleInputChangeFor = propertyName => (event) => {
      this.setState({
        [propertyName]: event.target.value,
      });
      console.log(event.target.value)
    }

  getEmailList = (id) => {
    this.props.dispatch({ type: 'GET_EMAIL_LIST', payload: {subject: this.state.subject, body: this.state.body, id: id} })
    this.setState({
      subject: '',
      body: '',
      open: false
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };

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
                    onClick={this.handleClickOpen}
                    >
                    Send
                    </Button>
                    <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    >
                      <DialogTitle>Confirm Message:</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                            Subject: {this.state.subject}
                            <br />
                            Body: {this.state.body}
                        </DialogContentText>
                        <DialogActions>
                          <Button onClick={this.handleClose}>Cancel</Button>
                          <Button onClick={() => this.getEmailList(this.props.imageReducer[0].id)}>Send</Button>
                        </DialogActions>
                      </DialogContent>

                    </Dialog>
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxStore) => ({
  imageReducer: reduxStore.imageReducer
});

export default connect(putReduxStateOnProps)(withStyles(styles)(Email));

import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Material UI Icons
import AddIcon from '@material-ui/icons/Add';


const styles =  {
    container: {
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
      marginBottom: '10px',
    },
    upload: {
        marginLeft: '150px',
        marginTop: '10px'
    },
    visibleSeperator: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginTop: '30px'
    },
    addButton: {
        marginTop: '30px'
    },
    topMargin: {
        marginTop: '100px'
    },
    leftIcon: {
        marginRight: '5px'
    }
  };

class BreweryForm extends Component {

    state = {
        name: '',
        bio: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        open: false
    }

    handleClickOpen = () => {
        this.setState({ 
            open: true });
      };
    
    handleClose = () => {
    this.setState({ open: false });
    };

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
    };

    handleFinishedUpload = info => {
        console.log('Access it on s3 at', info.fileUrl)
        this.props.dispatch({ type: 'ADD_BREWERY', payload: {
            name: this.state.name,
            bio: this.state.bio,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            image: info.fileUrl, 
            id: this.props.user.id 
        }})
        this.setState({
            name: '',
            bio: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            open: false
        })
    }

    render() {

        const { classes } = this.props;

        const uploadOptions = {
            server: 'http://localhost:5000',
            // signingUrlQueryParams: {uploadType: 'avatar'},
        }

        const s3Url = 'https://jamiebucket19.s3.amazonaws.com'

        return (
            <Fragment>
                <div className={classes.topMargin}>
                    <div className={classes.container}>
                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.addButton}
                    onClick={this.handleClickOpen}
                    >
                        <AddIcon className={classes.leftIcon} />
                        Brewery
                    </Button>
                    </div>
                </div>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                >
                    <DialogTitle>Add a Brewery!</DialogTitle>
                        <DialogContent>
                            <DialogContentText>To add a Brewery, please fill out the form below and choose a picture to upload</DialogContentText>
                            <div className={classes.container}>
                            <div>
                            <TextField
                                type="text"
                                name="name"
                                label="Name of brewery"
                                variant="outlined"
                                value={this.state.name}
                                className={classes.textField}
                                onChange={this.handleInputChangeFor('name')}
                            />
                            </div>
                            <div>
                            <TextField
                                type="text"
                                name="bio"
                                multiline
                                rows="4"
                                variant="outlined"
                                label="Enter a short bio"
                                value={this.state.bio}
                                className={classes.textField}
                                onChange={this.handleInputChangeFor('bio')}
                            />
                            </div>
                            <div>
                            <TextField
                                type="text"
                                name="street"
                                label="Street"
                                variant="outlined"
                                value={this.state.street}
                                className={classes.textField}
                                onChange={this.handleInputChangeFor('street')}
                            />
                            </div>
                            <div>
                            <TextField
                                type="text"
                                name="city"
                                label="city"
                                variant="outlined"
                                value={this.state.city}
                                className={classes.textField}
                                onChange={this.handleInputChangeFor('city')}
                            />
                            </div>
                            <TextField
                                type="text"
                                name="state"
                                label="State"
                                variant="outlined"
                                value={this.state.state}
                                className={classes.textField}
                                onChange={this.handleInputChangeFor('state')}
                            />
                            <div>
                            <TextField
                                type="number"
                                name="zip"
                                label="Zip"
                                variant="outlined"
                                value={this.state.zip}
                                className={classes.textField}
                                onChange={this.handleInputChangeFor('zip')}
                            />
                            </div>
                            
                            <div>
                            <DropzoneS3Uploader
                                className={classes.upload}
                                onFinish={this.handleFinishedUpload}
                                s3Url={s3Url}
                                maxSize={1024 * 1024 * 5}
                                upload={uploadOptions}
                                />
                            </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>
                        </DialogActions>
                </Dialog>
                
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  });
  
export default connect(mapStateToProps)(withStyles(styles)(BreweryForm));

import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import  Grid  from '@material-ui/core/Grid';


const styles =  {
    form: {
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
      marginBottom: '10px'
    },
    upload: {
        marginLeft: '150px',
        marginTop: '150px'
    },
    visibleSeperator: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginTop: '30px'
    },
  };

class BreweryForm extends Component {

    state = {
        name: '',
        bio: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        id: this.props.user.id
    };

    // addBrewery = (event) => {
    //     event.preventDefault();
    //     console.log(this.state)
    //     this.props.dispatch({ type: 'ADD_BREWERY', payload: this.state });
    //     this.setState({
    //         name: '',
    //         bio: '',
    //         street: '',
    //         city: '',
    //         state: '',
    //         zip: '',
    //     })

    // }; 

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
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <Typography variant="h2" className={classes.pageTitle}>
                            Enter Your Brewery
                        </Typography>
                        <form 
                        // onSubmit={this.addBrewery} className={classes.form}
                        >
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
                            <div>
                                <TextField
                                    type="text"
                                    name="state"
                                    label="State"
                                    variant="outlined"
                                    value={this.state.state}
                                    className={classes.textField}
                                    onChange={this.handleInputChangeFor('state')}
                                />
                            </div>
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
                                <Button
                                    type="submit"
                                    name="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Add Brewery
                                </Button>
                            </div>
                        </form>
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant="h2" className={classes.pageTitle}>
                                Upload an Image
                        </Typography>
                        <DropzoneS3Uploader
                        className={classes.upload}
                        onFinish={this.handleFinishedUpload}
                        s3Url={s3Url}
                        maxSize={1024 * 1024 * 5}
                        upload={uploadOptions}
                        />
                    </Grid>
                </Grid>
                <hr className={classes.visibleSeperator} />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  });
  
export default connect(mapStateToProps)(withStyles(styles)(BreweryForm));

import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';


const LogOutButton = props => (
  <Button
    className={props.className}
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
    style={{color: "#ff8c00"}}
  >
    Log Out
  </Button>
);

export default connect()(LogOutButton);

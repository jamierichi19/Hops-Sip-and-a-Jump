import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';


const LogOutButton = props => (
  <Button
    className={props.className}
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
    style={{color: "white"}}
  >
    Log Out
  </Button>
);

export default connect()(LogOutButton);

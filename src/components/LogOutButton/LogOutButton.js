import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';


const LogOutButton = props => (
  <Button
    className={props.className}
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
    style={{textDecoration: "none", color: "#D5D5D5"}}
  >
    Log Out
  </Button>
);

export default connect()(LogOutButton);

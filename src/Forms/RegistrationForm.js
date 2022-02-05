import { TextField, Grid ,Item} from '@mui/material';
import React from 'react';

function RegistrationForm() {
  const FormField = (props) => {
    return (
      <TextField
        margin="normal"
        required
        id={props.id}
        label={props.label}
        name={props.name}
        autoComplete={props.name}
        helperText="please fill"
        autoFocus
      />
    )
  }
  return (
    <>
      <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        
      </Grid>
      </Grid>
    </>
  );
}

export default RegistrationForm;


import { Grid} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { isValidEmail,isValidName } from "../common/Validations";
import Notification from '../common/Notification'
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  user_name: {
    marginTop: "20px",
    textAlign: "center",
  },
  department: {
    width: "85%",
    margin: "0 auto",
  },
}));

export default function NewUserForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 6000 })
  //validators for the new User Form
  const user_form_validators = {
    username: {
      error: false,
      validator: isValidName,
      message: "Please enter valid name",
    },
    email: {
      error: false,
      validator: isValidEmail,
      message: "Please enter valid email",
    },
  };

  //if user not available get the default state
  const getUserDetails = () => {
    let user = {};
    //user object properties
    let { username = "", email = "", departments = [], roleNames = [] } = user;
    return {
      username,
      email
    };
  };

  const [userDetails, setUserDetails] = useState(getUserDetails());
  const [validators, setValidators] = useState(user_form_validators);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      userDetails.username &&
      userDetails.email
    ) {
      let userData = {
        email:  userDetails.email + "@headinfotech.com",
        username: userDetails.username,
      };
    //   saveUser({ variables: { req: userData } })
    //     .then((res) => {
    //       if (res && (res.data.createAgent || res.data.editAgent)) {
    //         let msg = props.isCreate ? "Agent details created successfully, Please note down the password, Password is : " : "Agent details updated successfully"
    //         setNotification({ open: true, msg: msg, strongMsg: props.isCreate ? res.data.createAgent.password : "", type: "success", hideDuration: 6000 })
    //       } else {
    //         setNotification({ open: true, msg: "Failed to update Agent details", type: "error", hideDuration: 6000 })
    //       }
    //     })
    //     .catch((res) => {
    //       setNotification({ open: true, msg: res + ".", type: "error", hideDuration: 6000 })
    //     });
    // } else {
    //   setNotification({ open: true, msg: "Invalid Form", type: "error", hideDuration: 6000 })
    }
  };

  const resetForm = () => {
    // setUserDetails(getUserDetails());
  };
  const ControlsText=({name,label,value,error=null,onChange,...other})=>{
      return(
          <TextField
          variant="outlined"
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          {...(error&&{error:true,helperText:error})}
          {...other}
          />
      )
  }



  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    if (name === 'email') value = value + "@headinfotech.com";
    if (validators[name]) {
      const { status } = validators[name].validator(value);
      setValidators({
        ...validators,
        [name]: {
          ...validators[name],
          error: !status,
        },
      });
    }
    setUserDetails({
      ...userDetails,
      [name]: event.target.value,
    });
  };

  // if (error) return <div>Some error ocurred.</div>;

  return (
    <div style={{marginTop:'90px'}}>
      {
    //   !(props.isCreate) && <>
    //     <IconButton size="small" color="primary" onClick={resetUserPassword} aria-label="reset" style={{ float: 'right' }}>
    //       <small>Reset Password</small><RestoreIcon />
    //     </IconButton></>
      }
      <Notification notification={notification} setNotification={setNotification}></Notification>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
          xs={12}
        >
          <Grid container xs={12} direction="row">
            <Grid item xs={6} className={classes.user_name}>
              <ControlsText
                required
                label="Username"
                name="username"
                placeholder="Name"
                value={userDetails.username}
                onChange={handleChange}
                error={validators.username.error}
                helperText={
                  validators.username.error && validators.username.message
                }
              />
            </Grid>
            <Grid item item xs={6} className={classes.user_name}>
              <ControlsText
                required
                disabled={!props.isCreate}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{props.isCreate ? "@headinfotech.com" : ""}</InputAdornment>,
                }}
                label="Email"
                // placeholder="example@headinfotech.com"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                error={validators.email.error}
                helperText={validators.email.error && validators.email.message}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} direction="row">
                <div>Hi</div>
          </Grid> 
        </Grid>
      </form>
    </div>
  );
}

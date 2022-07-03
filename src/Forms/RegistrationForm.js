import { TextField, Grid ,Item} from '@mui/material';
import React,{useState,useEffect} from 'react';
import { Container } from '@mui/material';
import { LockOutlined, LockRounded } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import {  Box, Paper, Checkbox, FormControlLabel, Button, CssBaseline, Avatar, Link } from '@mui/material';
import { useSignInStyles } from '../common/style';
import { AppRegistrationOutlined } from '@mui/icons-material';
import Notification from '../common/Notification'
import {RegularButton,DeleteButton} from '../common/Buttons'
import axios from 'axios';
import { ADD_USER,BASE_URL } from '../common/path';
import { RegistrationError } from './FormError';

function RegistrationForm() {
  const classes=useSignInStyles()
  const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 3000 })
 
  const FormField = (props) => {
    return (
      <TextField
        margin="normal"
        type={props.type||"text"}
        required={props.required||false}
        fullWidth
        id={props.id}
        label={props.label}
        name={props.name}
        autoComplete={props.name}
        autoFocus
        {...props}
      />
    )
  }
  const handleRegister=(event)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get('email'));
    let user={
      userName:formData.get('userName'),
      email:formData.get('email'),
      password:formData.get('password'),
      firstName:formData.get('firstName'),
      lastName:formData.get('lastName'),
      phone:formData.get('phone')
    }
    if(RegistrationError(user,setNotification)) return;
    axios.post(`${BASE_URL}/${ADD_USER}`,user).then(res=>{
    console.log(res)
    if(res.data.status){
      setNotification({open:true,msg:res.data.msg,type:'success',hideDuration:3000})
    }
    else{
      setNotification({open:true,msg:res.data.msg,type:'error',hideDuration:3000})
    }
    },
    (error)=>{
      console.log(error)
      setNotification({open:true,msg:'something went wrong!',type:'error',hideDuration:3000})
      return;
    }
    )
    
  }
  return (
    <>
    <Container component="main" maxWidth="xs" >
      <Notification notification={notification} setNotification={setNotification}/>
    <CssBaseline />
    <div className={classes.paper}>
    <Avatar className={classes.avatar}>
          <AppRegistrationOutlined color="inherit" />
    </Avatar>
    <Typography component="h1" variant="h5">
          Register new user
    </Typography>
    <Notification notification={notification} setNotification={setNotification}/>
    <form className={classes.form} onSubmit={handleRegister} noValidate>
      <FormField id="userName" label="User Name" name="userName" required={true}  />
      <FormField id="password" label="Password" name="password" type="password" required={true} />
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
      <FormField id="firstName" label="First Name" name="firstName" required={true} />
      <FormField id="lastName" label="Last Name" name="lastName" />
      </div>
      <FormField id="email" label="Email" name="email" type="email" required={true}  />
      <FormField id="phone" label="Phone No" name="phone"  />
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
    <RegularButton type="submit">Register</RegularButton>
    <DeleteButton onClick={(event)=>{const formData = new FormData(event.currentTarget);
    console.log(formData.get('email'));}}>Cancel</DeleteButton>
    </div>
    </form>
    </div>
    </Container>
    </>
  );
}

export default RegistrationForm;

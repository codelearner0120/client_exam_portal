import * as React from 'react';
import { useState } from 'react';
import { Grid, Box, Paper, Checkbox, FormControlLabel, TextField, Button, CssBaseline, Avatar, Link } from '@mui/material';
import { LockOutlined, LockRounded } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSignInStyles } from '../common/style';
import { RegularButton } from '../common/Buttons';
import { Container } from '@mui/material';
import axios from 'axios';
import { BASE_URL,GENRATE_TOKEN } from '../common/path';
import { useAgent } from './useAgent';
import Notification from '../common/Notification';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigation=useNavigate();
  const redirect=(path)=>{
    navigation(path)
  }
  const classes = useSignInStyles()
  const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 6000 })
  const {saveInStorage}=useAgent();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('email'));
    // eslint-disable-next-line no-console
    let userAuth = {
      userName: data.get('email'),
      password: data.get('password')
    }
    console.log(userAuth)
    axios.post(`${BASE_URL}/${GENRATE_TOKEN}`, userAuth).then(response => {
    saveInStorage(response.data.token)
    setNotification({open:true,msg:'login successfully',type:'success',hideDuration:3000})
    redirect("/home");
    }).catch(error=>{
    setNotification({open:true,msg:'Login failed!',type:'error',hideDuration:3000})
    })
  };

  return (
    <Container component="main" maxWidth="xs">
      <Notification notification={notification} setNotification={setNotification}/>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined color="inherit" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="/login" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item sx={{ display: 'flex', justifyItems: 'center' }}>
              <Link href="/register" variant="body2">
                <div style={{ textAlign: 'center' }}>Don't have an account? Sign Up</div>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
import * as React from 'react';
import { Grid,Box,Paper,Checkbox,FormControlLabel,TextField,Button,CssBaseline,Avatar,Link } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LockOutlined } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSignInStyles } from '../common/style';
import { RegularButton } from '../common/Buttons';

const theme = createTheme();

export default function LoginForm() {
  const classes=useSignInStyles()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (

      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined color='primary' />
            </Avatar>
            <Typography component="h1" variant="h5">
              Exam Portal
            </Typography>
            {/* error alert */}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
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
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <RegularButton className={classes.submit}>Sign In</RegularButton>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> 
              </Grid> */}
            </Box>
          </Box>
        </Grid>
      </Grid>

  );
}
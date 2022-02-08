import * as React from 'react';
import { Grid, Box, Paper, Checkbox, FormControlLabel, TextField, Button, CssBaseline, Avatar, Link } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LockOutlined, LockRounded } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSignInStyles } from '../common/style';
import { RegularButton } from '../common/Buttons';
import { Container } from '@mui/material';

export default function LoginForm() {
  const classes = useSignInStyles()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('email'));
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
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
            <Grid item sx={{display:'flex',justifyItems:'center'}}>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
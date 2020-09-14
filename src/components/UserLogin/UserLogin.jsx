import React, {useEffect, useState} from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { loginApi, getUserApi } from '../../api';
import Auth from '../../auth';

const UserLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login (email, password) {
        await loginApi(email, password);
    }

    async function getUser () {
        const user = await getUserApi();
        console.log(user);
    }

    useEffect(() => {
      Auth.isAuthenticated();
    },[]);

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
      
    const classes = useStyles();
      
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <form className={classes.form} noValidate>
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
                  onChange = {e => setEmail(e.target.value)}
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
                  onChange = {e => setPassword(e.target.value)}
                />
                <Button onClick = {() => login(email, password)}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log In
                </Button>
                <Button onClick = {() => getUser()}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Get User
                </Button>
              </form>
            </div>
          </Container>
        );
}

export default UserLogin;
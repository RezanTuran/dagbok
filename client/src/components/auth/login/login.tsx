import React, { useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Box,
  useMediaQuery,
} from '@material-ui/core';
import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Alert from '@mui/material/Alert';
import useStyles from './styles';
import Logo from '../../../assets/diaryLogo.png';

const Login = () => {
  const isMobile = useMediaQuery('(min-width:736px)');
  const history = useHistory();
  const classes = useStyles();

  const [loginInput, setLogin]: any = useState({
    email: String,
    password: String,
    error_list: [],
  });

  const handleInput = (e: any) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    Axios.get('/sanctum/csrf-cookie').then((response) => {
      Axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          Swal.fire('Inloggad', '', 'success');
          setTimeout(() => {
            history.push('/diary');
            window.location.reload();
          }, 1000);
        } else if (res.data.status === 401) {
          Swal.fire('Användaren hittades inte', '', 'warning');
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <Grid>
      <Grid container className={classes.container}>
        <Grid
          item
          xs={12}
          sm={6}
          className={isMobile ? classes.imgGridDesktop : classes.imgGridMobile}
        ></Grid>
        <Grid
          container
          alignItems="center"
          direction="column"
          justifyContent="space-between"
          item
          xs={12}
          sm={6}
          style={{ padding: 10 }}
        >
          <Grid />
          <Box className={classes.box} component="form" onSubmit={loginSubmit}>
            <Grid container justifyContent="center">
              <img src={Logo} width={200} alt="Logo" />
            </Grid>
            <TextField
              label="Email"
              name="email"
              type="email"
              onChange={handleInput}
              value={loginInput.email}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlined />
                  </InputAdornment>
                ),
              }}
            />

            {loginInput.error_list.email ? (
              <Alert severity="error">Vänlingen skriv ditt email adress</Alert>
            ) : (
              ''
            )}

            <TextField
              name="password"
              type="password"
              label="Lösenord"
              onChange={handleInput}
              value={loginInput.password}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
              }}
            />
            {loginInput.error_list.password ? (
              <Alert severity="error">Vänlingen skriv dit lösenord</Alert>
            ) : (
              ''
            )}
            <Grid style={{ height: 20 }} />
            <Button
              endIcon={<LoginOutlinedIcon />}
              color="primary"
              variant="contained"
              type="submit"
              className={classes.loginButton}
            >
              Logga in
            </Button>
            <Grid style={{ height: 20 }} />
            <Button>Registrera dig</Button>
          </Box>
          <Grid />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;

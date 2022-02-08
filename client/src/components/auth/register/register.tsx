import React, { useState } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Box,
  useMediaQuery,
} from '@material-ui/core';
import {
  AccountCircleOutlined,
  LockOutlined,
  AlternateEmailOutlined,
} from '@material-ui/icons';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Alert from '@mui/material/Alert';
import useStyles from './styles';
import Logo from '../../../assets/diaryLogo.png';
import { Helmet } from 'react-helmet';

const Register = () => {
  const isMobile = useMediaQuery('(min-width:736px)');
  const history = useHistory();
  const classes = useStyles();

  const [registerInput, setRegister]: any = useState({
    name: String,
    email: String,
    password: String,
    error_list: [],
  });

  const handleInput = (e: any) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const login = () => {
    history.push('./login');
  };

  const registerSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    Axios.get('/sanctum/csrf-cookie').then((response) => {
      Axios.post(process.env.REACT_APP_API_REGISTER || '', data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal('Success', res.data.message, 'success');
          setTimeout(() => {
            history.push('/diary');
            window.location.reload();
          }, 1000);
        } else {
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <Grid>
      <Helmet>
        <title>Dagbok | Registrera</title>
      </Helmet>
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
          <Box
            className={classes.box}
            component="form"
            onSubmit={registerSubmit}
          >
            <Grid container justifyContent="center">
              <img src={Logo} width={200} alt="Logo" />
            </Grid>
            <TextField
              label="Namn"
              name="name"
              type="text"
              onChange={handleInput}
              value={registerInput.name}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlined />
                  </InputAdornment>
                ),
              }}
            />

            {registerInput.error_list.name ? (
              <Alert severity="error">Vänligen skriv ditt namn</Alert>
            ) : (
              ''
            )}

            <TextField
              name="email"
              type="email"
              label="Email"
              onChange={handleInput}
              value={registerInput.email}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailOutlined />
                  </InputAdornment>
                ),
              }}
            />
            {registerInput.error_list.email ? (
              <Alert severity="error">Vänlingen skriv ditt email adress</Alert>
            ) : (
              ''
            )}

            <TextField
              name="password"
              type="password"
              label="Lösenord"
              onChange={handleInput}
              value={registerInput.password}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
              }}
            />
            {registerInput.error_list.password ? (
              <Alert severity="error">
                Lösenordets längd måste vara minst 8{' '}
              </Alert>
            ) : (
              ''
            )}

            <Grid style={{ height: 20 }} />
            <Button
              endIcon={<LoginOutlinedIcon />}
              color="primary"
              variant="contained"
              type="submit"
              className={classes.registerButton}
            >
              Registrera dig
            </Button>
            <Grid style={{ height: 20 }} />
            <Button onClick={login}>Logga in i stället</Button>
          </Box>
          <Grid />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;

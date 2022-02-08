import React from 'react';
import Router from './router';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';

Axios.defaults.baseURL = 'http://localhost:8000/';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.post['Accept'] = 'application/json';
Axios.defaults.withCredentials = true;

Axios.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const App = () => {
  return (
    <Grid>
      <Router />
    </Grid>
  );
};

export default App;

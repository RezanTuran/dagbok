import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/home';
import Register from '../components/auth/register';
import Login from '../components/auth/login';
import Diary from '../components/diary';
import AddDiary from '../components/diary/add-diary';
import EditDiary from '../components/diary/edit-diary';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}>
        {localStorage.getItem('auth_token') ? <Diary /> : <Login />}
      </Route>
      <Route path="/diary" component={Diary}>
        {localStorage.getItem('auth_token') ? <Diary /> : <Login />}
      </Route>

      <Route path="/login">
        {localStorage.getItem('auth_token') ? (
          <Redirect to="/diary" />
        ) : (
          <Login />
        )}
      </Route>

      <Route path="/register">
        {localStorage.getItem('auth_token') ? (
          <Redirect to="/diary" />
        ) : (
          <Register />
        )}
      </Route>
      <Route path="/add-diary" component={AddDiary}>
        {localStorage.getItem('auth_token') ? <AddDiary /> : <Login />}
      </Route>
      <Route path="/edit-diary/:id" component={EditDiary}></Route>
    </Switch>
  );
};

export default Router;

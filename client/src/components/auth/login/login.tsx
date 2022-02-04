import React, { useState } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import Nav from '../../navbar';

const Login = () => {
  const history = useHistory();
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
          swal('Success', res.data.message, 'success');
          history.push('/diary');
        } else if (res.data.status === 401) {
          swal('Warning', res.data.message, 'warning');
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <div>
      <Nav />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      onChange={handleInput}
                      value={loginInput.email}
                      className="form-control"
                    />
                    <span>{loginInput.error_list.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      onChange={handleInput}
                      value={loginInput.password}
                      className="form-control"
                    />
                    <span>{loginInput.error_list.password}</span>
                  </div>

                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

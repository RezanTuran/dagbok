import React from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const Nav = () => {
  let history = useHistory();
  const getNameFromLocalStorage = localStorage.getItem('auth_name');

  const logoutSubmit = (e: any) => {
    e.preventDefault();

    Axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        Swal.fire('Utloggad', '', 'success');
        setTimeout(() => {
          history.push('/login');
          window.location.reload();
        }, 1000);
      }
    });
  };

  var AuthButtons: any = '';

  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <Button
        type="button"
        style={{ backgroundColor: '#FFC745', color: '#9D0606' }}
        variant="contained"
        onClick={() => history.push('/login')}
        endIcon={<LoginOutlinedIcon />}
      >
        Logga in
      </Button>
    );
  } else {
    AuthButtons = (
      <>
        <Button
          style={{ backgroundColor: '#FFC745', color: '#9D0606' }}
          type="button"
          variant="contained"
          onClick={logoutSubmit}
          endIcon={<LogoutOutlinedIcon />}
        >
          Logga ut
        </Button>

        <Typography
          style={{ color: '#FFC745' }}
          marginLeft="10px"
          onClick={() => history.push('/diary')}
        >
          {getNameFromLocalStorage}
        </Typography>
      </>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#9D0606' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ color: '#FFC745' }}
          >
            Dagbok
          </Typography>
          <Button>{AuthButtons}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;

import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  Grid,
  TextField,
  Button,
  useMediaQuery,
  TextareaAutosize,
  Box,
} from '@material-ui/core';
import Nav from '../../navbar';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import useStyles from './styles';

const AddDiary = () => {
  let history = useHistory();
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:736px)');

  const [diary, setDiary]: any = useState({
    title: String,
    date: String,
    desc: String,
  });

  const handleInput = (e: any) => {
    setDiary({
      ...diary,
      [e.target.name]: e.target.value,
    });
  };

  const saveDiary = async (e: any) => {
    e.preventDefault();

    const res = await Axios.post(
      process.env.REACT_APP_API_ADD_DIARY || '',
      diary
    );
    if (res.data.status === 200) {
      Swal.fire('Ny dagbok sparat', '', 'success');
      setTimeout(() => {
        history.push('/diary');
        window.location.reload();
      }, 1000);
      setDiary({
        ...diary,
      });
    } else if (res.data.status === 422) {
      Swal.fire('Vänligen fyll i alla fält ', '', 'error');
    }
  };

  return (
    <Grid>
      <Nav />
      <Box onSubmit={saveDiary} component="form" className={classes.box}>
        <Grid className={isMobile ? classes.gridDesktop : classes.gridMobile}>
          <TextField
            type="text"
            name="title"
            value={diary.title}
            onChange={handleInput}
            id="outlined-basic"
            placeholder="Rubrik"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            type="date"
            name="date"
            value={diary.date}
            onChange={handleInput}
            id="outlined-basic"
            variant="outlined"
            className={classes.input}
          />

          <TextareaAutosize
            rows={20}
            name="desc"
            value={diary.desc}
            onChange={handleInput}
            className={classes.input}
            placeholder="Skriv din bok här..."
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            endIcon={<SaveOutlinedIcon />}
          >
            Spara
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => history.push('/diary')}
            startIcon={<ArrowBackOutlinedIcon />}
          >
            Tillbaka
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};

export default AddDiary;

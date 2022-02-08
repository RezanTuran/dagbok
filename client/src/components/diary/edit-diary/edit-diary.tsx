import Axios from 'axios';
import React, { useEffect, useState } from 'react';
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
import useStyles from './styles';
import LinearProgress from '@mui/material/LinearProgress';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Helmet } from 'react-helmet';

const EditDiary = (props: any) => {
  const history = useHistory();
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:736px)');
  const [diary, setDiary]: any = useState({
    title: String,
    date: String,
    desc: String,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const handleInput = (e: any) => {
    setDiary({
      ...diary,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const diary_id = props.match.params.id;
    Axios.get(`${process.env.REACT_APP_API_EDIT_DIARY}/${diary_id}`).then(
      (res) => {
        if (res.data.status === 200) {
          setDiary(res.data.message);
        } else if (res.data.status === 404) {
          Swal.fire('Dagboken hittades inte', '', 'error');
          history.push('/diary');
        }
        setLoading(false);
      }
    );
  }, [props.match.params.id, history]);

  const updateDiary = async (e: any) => {
    e.preventDefault();
    const diary_id = props.match.params.id;

    const res = await Axios.post(
      `${process.env.REACT_APP_API_UPDATE_DIARY}/${diary_id}`,
      diary
    );
    if (res.data.status === 200) {
      setTimeout(() => {
        history.push('/diary');
        window.location.reload();
      }, 1000);
      Swal.fire('Dagbok uppdaterat', '', 'success');
    } else if (res.data.status === 422) {
      Swal.fire('Vänligen fyll i alla fält', '', 'error');
    } else if (res.data.status === 404) {
      Swal.fire('Dagboken hittades inte', '', 'error');
      history.push('/view-diary');
    }
  };

  if (loading) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <Grid>
      <Helmet>
        <title>Dagbok | Redigera Dagbok</title>
      </Helmet>
      <Nav />
      <Box onSubmit={updateDiary} component="form" className={classes.box}>
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
            minRows={20}
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
            endIcon={<EditOutlinedIcon />}
          >
            Uppdatera
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

export default EditDiary;

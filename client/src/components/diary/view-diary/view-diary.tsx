import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import useStyles from './styles';
import { useMediaQuery } from '@material-ui/core';
import DiaryIcon from '../../../assets/diaryIcon.png';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const ViewDiary = () => {
  const history = useHistory();
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:736px)');

  const [viewDiary, setViewDiary] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isReadMore, setIsReadMore] = useState<boolean>(true);

  useEffect(() => {
    Axios.get(`/api/view-diary`).then((res) => {
      if (res.data.status === 200) {
        setViewDiary(res.data.diarys);
        setLoading(false);
      }
    });
  }, []);

  const deleteDiary = async (e: any, id: any) => {
    const res = await Axios.delete(`/api/delete-diary/${id}`);
    if (res.data.status === 200) {
      window.location.reload();
    }
  };

  if (loading) {
    return <LinearProgress color="secondary" />;
  } else {
    return (
      <Grid
        className={
          isMobile ? classes.containerDesktop : classes.containerMobile
        }
      >
        {viewDiary.map((item: any, index: any) => {
          return (
            <Card sx={{ maxWidth: 345 }} className={classes.card} key={index}>
              <CardMedia
                component="img"
                alt="diary icon"
                height="240"
                image={DiaryIcon}
                style={{
                  width: 'auto',
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.date}</Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                  {isReadMore ? item.desc.slice(0, 250) : item.desc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  type="button"
                  size="small"
                  onClick={(e) => deleteDiary(e, item.id)}
                  endIcon={<DeleteOutlinedIcon />}
                >
                  Ta Bort
                </Button>
                <Button
                  type="button"
                  size="small"
                  onClick={() => history.push(`edit-diary/${item.id}`)}
                  endIcon={<EditOutlinedIcon />}
                >
                  Redigera
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    );
  }
};

export default ViewDiary;

import React from 'react';
import Nav from '../navbar';
import ViewDiary from './view-diary';
import Grid from '@material-ui/core/Grid';

const Diary = () => {
  return (
    <Grid>
      <Nav />
      <ViewDiary />
    </Grid>
  );
};

export default Diary;

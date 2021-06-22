import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FakeVideos from '../PlaceHolderData/FakeVideos';
import Video from './Video';


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));

console.log(FakeVideos);

const VideosGrid = ({ setCurrentId }) => {
  
  const classes = useStyles();

  return (
    !FakeVideos.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {FakeVideos.map((video) => (
          <Grid key={video._id} item xs={12} sm={6} md={6}>
            <Video video={video} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default VideosGrid;
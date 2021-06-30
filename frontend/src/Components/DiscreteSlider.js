import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles((theme) => ({
  root: { width: 300,},
  margin: {height: theme.spacing(3),},
}));

export default function DiscreteSlider({timeprop}) { 
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        Select video duration in minutes
      </Typography>
      <Slider
        defaultValue={2}
        aria-labelledby="discrete-slider-custom"
        step={0.5}
        max={5}
        min={0}
        valueLabelDisplay="auto"
        onChange={timeprop}
        id="Slider"

      />
    </div>
  );
}

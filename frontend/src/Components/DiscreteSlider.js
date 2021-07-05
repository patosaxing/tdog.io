import React from 'react';
import { useState,createContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export const TimerContext = createContext()

const useStyles = makeStyles((theme) => ({
  root: { width: 300,},
  margin: {height: theme.spacing(3),},
}));

export default function DiscreteSlider() { 
  
  const classes = useStyles();
  const [timer, setTimer] = useState(2)
  const handleTimer = (event, newValue) => {setTimer(newValue)};


  return (
    <TimerContext.Provider value={timer}>
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
          onChange={handleTimer}
          id="Slider"
          />
      </div>
    </TimerContext.Provider>
  );
}

import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button, Card, CardContent, CardActions, Typography, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DiscreteSlider from "./timer_slider";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  slider: {
    width: 600,
    margin: '0 2vh',
    padding: '1rem',
  },
  sliderTop: {
    marginTop: '4vh',
    padding: '1rem',
    fontSize: '2rem',
  },
  title: {
    fontSize: 4,
  },
  pos: {
    marginBottom: 12,
  },
});

const marks = [
  {
    value: 0.00001,
    label: '➸',
  },
  {
    value: 0.5,
    label: '0.5',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 1.5,
    label: '1.5',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 2.5,
    label: '2.5',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 3.5,
    label: '3.5',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 4.5,
    label: '4.5',
  },
  {
    value: 5,
    label: '5',
  },
];

export default function WebcamStreamCapture() {
  const classes = useStyles();

  // Webcam npm
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [timer, setTimer] = useState()
  let numFromSlider;

  const getSliderValue = (num) => {
    // console.log('value from getSliderValue', num)
    let numFromSlider = num;
    console.log(' after getslider called', numFromSlider)
    return numFromSlider;
  }

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  const handleStartCaptureClick = useCallback(() => {
    // e.preventDefault();
    getSliderValue(numFromSlider);
    console.log('timer INSIDE recording', numFromSlider)
    setCapturing(true);
    // let timeRec = numFromSlider;

    //setTimeout(handleStopCaptureClick,timer*60000)
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [handleDataAvailable]);


  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);



  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);


  return (
    <Card className={classes.root}>
      {/* <DiscreteSlider/> */}
      {/* **** Slider component start****  */}

      <Typography id="discrete-slider-custom" className={classes.sliderTop}>
        Set recording time (minute)
      </Typography>
      <Slider
        className={classes.slider}
        defaultValue={4.5}
        // value={value}
        aria-labelledby="discrete-slider-custom"
        step={0.5}
        min={-0.000000001}
        max={5}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(e, value) => {
          setTimer(value);
          console.log('OnCHange from Slider', timer);
        }
        }
      />

      {/* ****  Slider component end *****/}

      <CardContent>
        <Webcam audio={true} ref={webcamRef} />
      </CardContent>
      <CardActions>
        {capturing ? (
          <Button variant="contained" color="secondary" onClick={handleStopCaptureClick}>⬜ Stop Recording</Button>
        ) : (
          <Button onClick={handleStartCaptureClick}>🔴 Start Recoding</Button>
        )}
        {recordedChunks.length > 0 && (
          <Button variant="contained" color="primary" onClick={handleDownload}>⬇︎ Downlad</Button>
        )}
      </CardActions>
    </Card>
  );
};
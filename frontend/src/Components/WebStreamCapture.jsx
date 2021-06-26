import React, { useState, useRef, useCallback, useEffect } from "react";
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
  const [timer, setTimer] = useState(0.5)
  let lenght = timer;
  console.log('PRIOT enter useEffect', lenght)

  useEffect(() => {
    setTimeout(() => {
      console.log('timer inside useEffect', timer);
      // handleStopCaptureClick();
    }, timer * 100);
    console.log('this is LENGTH ', timer);
    setTimer(lenght);
    console.log('timer after SET', timer);
    return timer;
  }, [timer, lenght]);

  async function handleSliderChange(slideNum) {
    setTimer(slideNum);
  }
  const stopViInTime = () => {
    console.log('this is lenght in stopViInTime', timer);
    const VT = setTimeout(() => {
      handleStopCaptureClick();
    }, timer * 60000);
    clearTimeout(VT);
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

    console.log('timer INSIDE recording', timer)
    setCapturing(true);

    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    stopViInTime();
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
        defaultValue={0.5}
        aria-labelledby="discrete-slider-custom"
        step={0.5}
        min={-0.000000001}
        max={5}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(e, value) => {
          console.log('OnCHange from Slider', value);
          handleSliderChange(value);

          console.log('OnCHange TIMER after slide', { timer });
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
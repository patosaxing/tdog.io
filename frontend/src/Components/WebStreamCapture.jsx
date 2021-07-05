import React, { useState } from "react";
import Webcam from "react-webcam";
import { Button, Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Slider from "./Slider";

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

export default function WebcamStreamCapture() {
  const classes = useStyles();

  const [timer, setTimer] = useState(2)
  const handleTimer = (event) => { setTimer(event.target.value) }

  // Webcam npm
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);


  // Handling data
  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    console.log("Timer in recording button:", timer);
    setTimeout(handleStopCaptureClick, timer * 30000) // set timer half for debugging
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleDataAvailable, timer]);


  const handleStopCaptureClick = React.useCallback(() => {
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

  const handlePreview = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" })
      console.log(blob)
      return (
        <video width="400" controls>
          <source src={blob} />
        </video>)
    }
  }, [recordedChunks])

  return (
    <Card className={classes.root}>
      <CardContent>
        <Webcam audio={true} ref={webcamRef} />
      </CardContent>
      <CardActions>
        {capturing ? (
          <Button variant="contained" color="secondary" onClick={handleStopCaptureClick}>⬜ Stop Recording (Auto stop in {timer} minutes)</Button>
        ) : (
          <Button onClick={handleStartCaptureClick}>🔴 Start Recoding</Button>
        )}
        {recordedChunks.length > 0 && (<div>
          <Button variant="contained" color="primary" onClick={handleDownload}>⬇︎ Downlad</Button>
          <Button variant="contained" color="primary" onClick={handlePreview}>Preview</Button>
        </div>
        )}
        <Slider timer={timer} handleTimer={handleTimer} />
      </CardActions>
    </Card>
  );
};
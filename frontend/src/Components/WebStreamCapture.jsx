import React from "react";
import Webcam from "react-webcam";
import { Button, Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Slider from "./slider";
import DiscreteSlider from "./DiscreteSlider";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WebcamStreamCapture() {
  const classes = useStyles();

  // Webcam npm
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [timer, setTimer] = React.useState()

  // Handling data
  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  const handleTimer = (event, newValue) => {
    setTimer(newValue)
    console.log("NEW VALUE",newValue)
    console.log("TIMER",timer)};

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
      );
    mediaRecorderRef.current.start();
    setTimeout(handleStopCaptureClick,timer*60000)
  }, [handleDataAvailable]);


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
 
  return (
    <Card className={classes.root}>
      <DiscreteSlider timeprop={handleTimer}/>
     <CardContent>
      <Webcam audio={true} ref={webcamRef} />
     </CardContent>
     <CardActions>
     {capturing ? (
        <Button variant="contained" color="secondary" onClick={handleStopCaptureClick}>⬜ Stop Recording (Auto stop in {timer} minutes)</Button>
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
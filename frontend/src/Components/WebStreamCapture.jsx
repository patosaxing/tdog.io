import React from "react";
import Webcam from "react-webcam";
import { Button, Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DiscreteSlider from "./timer_slider";


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
  // MAterial styling variabl
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  
  // Webcam npm
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  // const [timer, setTimer]= useSelector()

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
    // console.log(timer)
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
      <DiscreteSlider/>

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
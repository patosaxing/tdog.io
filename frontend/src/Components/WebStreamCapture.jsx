import React, { useState } from "react";
import Webcam from "react-webcam";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "./Slider";
import ReactModal from "react-modal";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "flex",
    borderRadius: "0.5rem",
    background: "#d9d9d9",
    boxShadow: "20px -20px 39px #636161 -20px 20px 39px #959191"
  },
  title: {
    fontSize: 4,
  },
  pos: {
    marginBottom: 12,
  },
  webCam: {
    borderRadius: "0.5rem",
  },
});

export default function WebcamStreamCapture() {
  const classes = useStyles();

  const [timer, setTimer] = useState(1.5);
  const handleTimer = (event) => {
    setTimer(event.target.value);
  };

  // Webcam npm
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
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
    setTimeout(handleStopCaptureClick, timer * 60000);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
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
        type: "video/webm",
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
      <CardContent className={classes.webCam}>
        <Webcam className={classes.webCam} audio={true} ref={webcamRef} />
      </CardContent>
      {/* <Slider className="card-link" timer={timer} handleTimer={handleTimer} /> */}
      <CardActions style={{ display: "block" }}>
        {capturing ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleStopCaptureClick}
            style={{ margin: "2rem" }}
          >
            ⬜ Stop Recording (Auto stop in {timer} minutes)
          </Button>
        ) : (
          <Button style={{ margin: "2rem" }} onClick={handleStartCaptureClick}>
            🔴 Start Recording
          </Button>
        )}
        {recordedChunks.length > 0 && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownload}
              style={{ margin: "2rem" }}
            >
              ⬇︎ Downlad
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPreview(true)}
            >
              Preview
            </Button>
          </div>
        )}
        <Slider
          style={{ marginTop: "10rem" }}
          timer={timer}
          handleTimer={handleTimer}
        />
      </CardActions>
      <ReactModal
        isOpen={preview}
        ariaHideApp={false}
        // onAfterClose={setPreview(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 50,
            left: 0,
            right: 500,
            bottom: 0,
            zIndex: 5000,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <Button
          style={{ float: "right" }}
          onClick={() => window.location.reload()}
        >
          CLOSE X
        </Button>
        <video width="800" controls>
          <source
            src={URL.createObjectURL(
              new Blob(recordedChunks, { type: "video/webm" })
            )}
            type="video/webm"
          />
        </video>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          ⬇︎ Downlad
        </Button>
      </ReactModal>
    </Card>
  );
}

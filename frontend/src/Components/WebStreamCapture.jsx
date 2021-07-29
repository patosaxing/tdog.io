import React, { useState } from "react";
import Webcam from "react-webcam";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "./Slider";
import ReactModal from "react-modal";

const useStyles = makeStyles({
  root: {
    width: "80rem",
    display: "flex",
    borderRadius: "0.5rem",
    background: "#d9d9d9",
    boxShadow: "20px -20px 39px #636161 -20px 20px 39px #959191",
    marginTop: "1rem",
  },
  title: {
    fontSize: 4,
  },
  pos: {
    marginBottom: 12,
  },
  webCam: {
    borderRadius: "0.5rem",
    marginLeft: "0.25rem",
    maxWidth: "30rem",
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
    // mediaRecorderRef.current.stop();
    console.log("Media Test", mediaRecorderRef.current);
    if (mediaRecorderRef.current.state === "inactive") {
      setCapturing(false);
    } else {
      mediaRecorderRef.current.stop();
    }
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

  const closeModal = () => {
    document.getElementById("previewModal").style.display = "none";
    setPreview(false);
  };

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
              ⬇︎ Download
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
          style={{ float: "right" }}
          timer={timer}
          handleTimer={handleTimer}
        />
      </CardActions>

      <ReactModal
        isOpen={preview}
        ariaHideApp={false}
        id="previewModal"
        // onAfterClose={setPreview(false)}
        style={{
          content: {
            // background: "#d6ebfd",
            width: "fit-content",
            height: "fit-content",
            background: "linear-gradient(145deg, #ffffff, #d6dcdd)",
            boxShadow: "20px 20px 60px #cacfd1 -20px -20px 60px #ffffff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "2rem",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "25vw",
          },
          
        }}
      >
        <header>
          <h4>Preview your recording</h4>
        </header>

        <video style={{ margin: "2rem" }}  controls>
          <source
            src={URL.createObjectURL(
              new Blob(recordedChunks, { type: "video/webm" })
            )}
            type="video/webm"
          />
        </video>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={closeModal}
            // onClick={() => window.location.reload()}
          >
            CLOSE preview
          </Button>
          <Button
            style={{ marginLeft: "4rem" }}
            variant="contained"
            color="primary"
            onClick={handleDownload}
          >
            Download this
          </Button>
        </div>
      </ReactModal>
    </Card>
  );
}

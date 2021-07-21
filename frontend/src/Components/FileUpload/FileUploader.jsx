import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  const [uploadedFile, setUploadedFile] = useState({}); // server send back an obj
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]); // we can upload multi files so we choose the 1st
    setFilename(e.target.files[0].name); //🅱
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let submitFile = document.querySelector("#customFile");
    formData.append("fileToBeUpload", submitFile.files);

    console.log("formData", formData);
    console.log("file onsubmit", submitFile.files);

    try {
      // we added proxy so no need to pass localhost5000
      const res = await axios.post("/api/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });

      // Clear percentage in the progressBar
      setTimeout(() => setUploadPercentage(0), 5000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage("Successfully uploaded to Eval-view server  ");
    } catch (err) {
      // if (err.response.status === 500) {
      if (err.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.msg);
      }
      setUploadPercentage(0);
    }
  };

  return (
    <Fragment>
      <h3 style={{ marginTop: "20px" }}>Upload your video 🎞 to Eval-view</h3>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={() => onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Upload 🖅"
          className="btn btn-primary btn-block mt-4"
        />
      </form>

      {/* attempt to display uploaded IMAGE file for testing */}
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            {/* <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="uploaded" /> */}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;

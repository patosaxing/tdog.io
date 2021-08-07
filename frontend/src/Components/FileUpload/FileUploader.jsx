import React, { useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
import questions from "../Interview_questions.json";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import CloudUpload from "../../img/CloudUpload.svg";
import { useDispatch, useSelector } from "react-redux";

const FileUpload = () => {
  // eslint-disable-next-line
  // const [file, setFile] = useState("");
  // const [filename, setFilename] = useState("");
  // const [uploadedFile, setUploadedFile] = useState({}); // server send back an obj
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [category, setCategory] = useState("Basic interview questions");
  const [Skill, setSkill] = useState("");
  const [userNote, setUserNote] = useState("");
  const [sharePublic, setSharePublic] = useState(false);

  // const dispatch = useDispatch();
  // const userDetails = useSelector((state) => state.userDetails);
  // const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("userInfo from Redux:  ", userInfo);
    let formData = new FormData();

    let submitFile = document.querySelector("#customFile");
    console.log("submit file :", submitFile.files[0]);
    formData.append("file", submitFile.files[0]);
    const fileSize = submitFile.files[0].size;
    console.log("file size for uploading ", fileSize);

    if (fileSize > 50000000) {
      setMessage("❗ File exceeded size limit of 50MB");
      return setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      formData.append("name", submitFile.files[0].name);
      formData.append("category", category);
      formData.append("Skill", Skill);
      formData.append("userID", userInfo._id);
      formData.append("sharePublic", sharePublic);
      formData.append("userNote", userNote);

      console.log("formData userID:", userInfo._id);
      // console.log("formData Skill", submitFile.files.length);

      try {
        setMessage("... Uploading ...  ");
        await axios.post("/api/videos", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round(
                  (progressEvent.loaded * 92) /
                    (progressEvent.total * (Math.random() * (1 - 1.3) + 1))
                )
              )
            );
          },
        });

        setTimeout(() => {
          setUploadPercentage(100);
          setMessage("📂 Successfully uploaded to Eval-view server  ");
        }, 1000);

        // Clear percentage in the progressBar and reset states
        setTimeout(() => {
          setUploadPercentage(0);
          setMessage("");
        }, 2000);
      } catch (err) {
        // if (err.response.status === 500) {
        if (err.status === 500) {
          setMessage("There was a problem with the server");
        } else {
          setMessage(err.msg);
        }
        setUploadPercentage(0);
      }
    }
  };
  return (
    <div className="fileUploader">
      <h4 className="my-4">
        <img src={CloudUpload} alt="cloud Upload" /> Upload your Recording🎞 to
        Eval-view{" "}
      </h4>
      {message ? <Message msg={message} /> : null}
      {/* <h4>{question}</h4> */}

      <Progress percentage={uploadPercentage} />

      <form onSubmit={onSubmit}>
        <div className="custom-file my-4">
          <input
            type="file"
            name="file"
            id="customFile"
            required={true}
            class="custom-file-input"
            accept="video/*"
          ></input>
          <label for="file" class="custom-file-label"></label>
        </div>

        <div>
          <h6>Select catergory of this recording</h6>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {Object.keys(questions).map((category) => (
              <option value={category} key={category} active>
                {category}
              </option>
            ))}
          </Form.Control>
        </div>
        <h6 style={{ color: "transparent" }}>spacer</h6>
        <Form.Label>Skill related to this recording</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Marketing, Project Tracking, Medical Research..."
          value={Skill}
          required={true}
          onChange={(e) => setSkill(e.target.value)}
        ></Form.Control>
        <h6 style={{ color: "transparent" }}>spacer</h6>
        <Form.Label>Additional notes</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. ABC company uses this question..."
          value={userNote}
          required={false}
          onChange={(e) => setUserNote(e.target.value)}
        ></Form.Control>
        <h6 style={{ color: "transparent" }}>spacer</h6>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Share this video to public for feedback"
            onClick={() => setSharePublic(true)}
          />
        </Form.Group>
        <input
          type="submit"
          value="Upload 🖅"
          className="btn btn-secondary btn-block mt-4"
        />
      </form>

      {/* attempt to display uploaded IMAGE file for testing */}
      {/*  */}
    </div>
  );
};

export default FileUpload;

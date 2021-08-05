import React, { useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
import questions from "../Interview_questions.json";
import { Form } from "react-bootstrap";
import CloudUpload from "../../img/CloudUpload.svg";
import { useDispatch, useSelector } from 'react-redux';

const FileUpload = () => {
  // eslint-disable-next-line
  // const [file, setFile] = useState("");
  // const [filename, setFilename] = useState("");
  // const [uploadedFile, setUploadedFile] = useState({}); // server send back an obj
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [category, setCategory] = useState("Basic interview questions");
  const [Skill, setSkill] = useState("");

  // const dispatch = useDispatch();
  // const userDetails = useSelector((state) => state.userDetails);
  // const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('userInfo from Redux:  ', userInfo);
    let formData = new FormData();

    let submitFile = document.querySelector("#customFile");
    console.log("submit file :", submitFile.files[0]);
    formData.append("file", submitFile.files[0]);

    if (submitFile.files.length < 1) {
      setMessage("👇 Please select a video file");
      return setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      formData.append("name", submitFile.files[0].name);
      formData.append("category", category);
      formData.append("Skill", Skill);
      formData.append("userID", userInfo._id);
      
      console.log("formData userID:", userInfo._id);
      // console.log("formData Skill", submitFile.files.length);

      try {
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

        // const { fileName, filePath } = res.data;

        // setUploadedFile({ fileName, filePath });

        setMessage("📂 Successfully uploaded to Eval-view server  ");
        // Clear percentage in the progressBar and reset states
        setTimeout(() => {
          setUploadPercentage(0);
          setMessage("");
        }, 4000);
      } catch (err) {
        // if (err.response.status === 500) {
        if (err.status === 500) {
          setMessage(
            "There was a problem with the server"
          );
        } else {
          setMessage(err.msg);
        }
        setUploadPercentage(0);
      }
    }
  };
  return (
    <div className="fileUploader" >
      <h3 className="my-4">
        <img src={CloudUpload} alt="cloud Upload" /> Upload your Recording🎞 to
        Eval-view{" "}
      </h3>
      {message ? <Message msg={message} /> : null}
      {/* <h4>{question}</h4> */}

      <Progress percentage={uploadPercentage} />

      <form onSubmit={onSubmit}>
        <div className="custom-file my-4">
          <input
            type="file"
            name="file"
            id="customFile"
            class="custom-file-input"
            accept="video/*"
          ></input>
          <label for="file" class="custom-file-label">
          
          </label>
        </div>

        <div>
          <h6>Catergory of this recording</h6>
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
        <h4 style={{ color: "transparent" }}>spacer</h4>
        <Form.Label>Skill related to this recording</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Skills"
          value={Skill}
          required={true}
          onChange={(e) => setSkill(e.target.value)}
        ></Form.Control>

        <input
          type="submit"
          value="Upload 🖅"
          className="btn btn-primary btn-block mt-4"
        />
      </form>

      {/* attempt to display uploaded IMAGE file for testing */}
      {/*  */}
    </div>
  );
};

export default FileUpload;

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import questions from "../Interview_questions.json";

const EditVideo = () => {
  const [category, setCategory] = useState("Basic interview questions");
  const [Skill, setSkill] = useState("");
  const [userNote, setUserNote] = useState("");
  const [sharePublic, setSharePublic] = useState(false);
  

  const onSubmit = () => {
    // dispatch editVideoRequest
  }

  return (
    <form onSubmit={onSubmit}>

      <div>
        <h6>Change catergory of this recording</h6>
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
      <Form.Label>Skill related to this Video</Form.Label>
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
          label="⮪ Select to share with public"
          onClick={() => setSharePublic(true)}
        />
      </Form.Group>
      <input
        type="submit"
        value="Update 🗉"
        className="btn btn-outline-primary btn-block mt-4"
      />
    </form>
  );
};


export default EditVideo;

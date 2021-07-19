import React from "react";
import questions from "./Interview_questions.json";
import { Button, Container, Form } from "react-bootstrap";


export default function QuestionSelection() {
  const [category, setCategory] = React.useState("Basic interview questions");
  const [question, setQuestion] = React.useState("");

  const handleChangeQues = (event) => {
    setQuestion(random_question());
  };

  const RandArray = (array) => array[(Math.random() * array.length) | 0];

  const random_question = () => {
    var randomly_generated_question = RandArray(questions[category]);
    return randomly_generated_question;
  };
  return (
    <div>
      <Container>
      <Form.Group controlId="formBasicSelect">
        <Form.Label>Click to select Category ☟</Form.Label>
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
      </Form.Group>
            <hr />
      {/* <h6 style={{ color: "transparent" }}>spacer</h6> */}
      <Button variant="secondary" onClick={handleChangeQues}>
        Generate Random Questions
      </Button>
      <hr />
      <div>{question}</div>
      <hr />
      </Container>
    </div>
  );
}

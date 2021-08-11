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

  const QuestionStyle ={
   
    fontStyle: 'italic',
    fontSize: '1.25rem',
    color: 'black',
    textShadow: '0.05rem 0.05rem grey' 
    }

  return (
      <Container>
        <Form.Group controlId="formBasicSelect">
          <Form.Label>Select ☟ question Category for recording</Form.Label>
          <Form.Control
            as="select"
            value={category}
            className="my-2"
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
        <Button
          className="my-4"
          variant="secondary"
          onClick={handleChangeQues}
        >
          Generate Random Questions
        </Button>
        <div style={QuestionStyle}>{question}</div>
      </Container>
  );
}

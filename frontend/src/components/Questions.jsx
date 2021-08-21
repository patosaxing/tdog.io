import React from "react";
import questions from "./Interview_questions.json";
import { Button, Container, Form } from "react-bootstrap";

export default function QuestionSelection() {
  const [category, setCategory] = React.useState("Select question Category for recording");
  const [question, setQuestion] = React.useState("");

  const handleChangeQues = (event) => {
    setQuestion(random_question());
  };

  const RandArray = (array) => array[(Math.random() * array.length) | 0];

  const random_question = () => {

    let randomly_generated_question = RandArray(questions[category]);
    return randomly_generated_question;
  };

  const QuestionStyle = {
    fontStyle: "italic",
    fontSize: "1.25rem",
    color: "black",
    textShadow: "0.05rem 0.05rem grey",
  };

  return (
    <Container>
    
       
          <Form.Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            aria-label="Default select example"
          >
            <option>Select question Category for recording</option>
            {Object.keys(questions).map((category) => (
              <option value={category}>{category}</option>
            ))}
      
          </Form.Select>

         
  
      <Button className="my-4" variant="secondary" onClick={handleChangeQues}>
        Generate Random Questions
      </Button>
      <div style={QuestionStyle}>{question}</div>
    </Container>
  );
}

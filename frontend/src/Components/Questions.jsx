import React from "react"
import questions from "./Interview_questions.json"

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '15px 15px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {margin: theme.spacing(1)},
}));

export default function QuestionSelection() {
    const classes = useStyles()
    const [category, setCategory] = React.useState("Basic interview questions")
    const [question, setQuestion] = React.useState('')
    const handleChangeCat = (event) => {setCategory(event.target.value)}
    const handleChangeQues = (event) => {setQuestion(random_question())}

    const RandArray = (array) => array[Math.random()*array.length | 0]
    
    const random_question = ()=>{
        var randomly_generated_question = RandArray(questions[category])
        return(randomly_generated_question)
    }
    return (
    <div>
      <FormControl className={classes.margin}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={category}
          onChange={handleChangeCat}
          input={<BootstrapInput />}
        >  
        {Object.keys(questions).map(category => (<MenuItem value={category} key={category}>{category}</MenuItem>))}
        </Select>
        <InputLabel id="demo-customized-select-label">Category</InputLabel>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleChangeQues}>Generate Random Questions</Button>
      <div>{question}</div>
    </div>
  )}
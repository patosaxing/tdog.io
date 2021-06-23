const questions = require ("./Interview_questions.json")

const RandArray = (array) => array[Math.random()*array.length | 0]
    
const random_question = (category)=>{
    var randomly_generated_question = RandArray(questions[category])
    console.log ("Question:   ",randomly_generated_question)}

questions_keys =[
    'Basic interview questions',
    'Salary questions',
    'Behavioral interview questions',
    'Career development questions',
    'Hypothetically hired interview questions',
    'Brainteaser questions',
    'Additional interview questions about you'
]    
const random_category = RandArray(questions_keys)
console.log("Category:   ",random_category)
random_question(random_category)
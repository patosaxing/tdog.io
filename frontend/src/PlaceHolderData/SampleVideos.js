import Sample1 from './img/Sample1.svg'
import Sample2 from './img/Sample2.svg'
import Sample3 from './img/Sample3.svg'
import Sample4 from './img/Sample4.svg'
import Sample5 from './img/Sample5.svg'


const SampleVideos = [
  {
    _id: '1',
    name: 'Basic Interview',
    video: Sample1,
    description:
      'Basic Interview Querstion',
    category: 'Basic',
    topic: 'Soft Skill',
    view: 21,
    comment: 3,
    rating: 4.5,
    numReviews: 4,
  },
  {
    _id: '2',
    name: 'Salary Questions',
    video: Sample2,
    description:
      'What makes you the best candidate for this job?',
    category: 'Basic',
    topic: 'Resposibility',
    view: 20,
    comment: 10,
    rating: 4.0,
    numReviews: 4,
  },
  {
    _id: '3',
    name: 'Soft skills interview',
    video: Sample3,
    description:
      'If we were to offer you the salary you requested but you had to write your job description for the first year of employment, what would it say?',
    category: 'Salary',
    topic: 'Salary',
    view: 32,
    comment: 5,
    rating: 4.5,
    numReviews: 3,
  },
  {
    _id: '4',
    name: 'Project Management',
    video: Sample4,
    description:
      'If you could remove any state in the United States, which would you choose and why?',
    category: 'Brainteaser',
    topic: 'Imagination',
    view: 42,
    comment: 10,
    rating: 4.5,
    numReviews: 3,
  },
]

export default SampleVideos
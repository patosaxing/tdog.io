import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <div className="form-check-inline">

    <Form onSubmit={submitHandler} style={{display: 'flex'}}>;
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Video...'
        className='p-2'
      >
      </Form.Control>
      <Button type='submit' variant='outline-success' className='p-1'>
        Search
      </Button>
    </Form>
    
    </div>
  )
}

export default SearchBox
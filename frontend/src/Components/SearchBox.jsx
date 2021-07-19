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

    <Form onSubmit={submitHandler} style={{display: 'flex'}}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Video ...'
        className='p-2'
      >
      </Form.Control>
      <h6 style={{color:'transparent'}}>s</h6>
      <Button type='submit' variant='secondary' className='p-1'>
        🔎
      </Button>
    </Form>
    
    </div>
  )
}

export default SearchBox
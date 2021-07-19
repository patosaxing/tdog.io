import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Video = ({ video }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/video/${video._id}`}>
        <Card.Img src={video.image} variant='top' />
      </a>

      <Card.Body>
        <a href={`/video/${video._id}`}>
          <Card.Title as='div'>
            <strong>{video.name}</strong>
          </Card.Title>
        </a>

        <Card.Text as='div'>
          <Rating
            value={video.rating}
            text={`${video.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>{video.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Video;
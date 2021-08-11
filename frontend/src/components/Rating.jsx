import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <div style={{color: '#446e9b'}}>
      <span>
        {(value>=1) ? <span> ⬤ </span>: (value >= 0.5) ? <span> ◒ </span> :<span> ⬤ </span>}
      </span>
      <span>
        {(value>=2) ? <span> ⬤ </span>: (value >= 1.5) ? <span> ◒ </span> :<span> ⬤ </span>}
      </span>
      <span>
        {(value>=3) ? <span> ⬤ </span>: (value >= 2.5) ? <span> ◒ </span> :<span> </span>}
      </span>
      <span>
        {(value>=4) ? <span> ⬤ </span>: (value >= 3.5) ? <span> ◒ </span> :<span> </span>}
      </span>
      <span>
        {(value>=5) ? <span> ⬤ </span>: (value >= 4.5) ? <span> ◒ </span> : <span></span>}
      </span>
      </div>
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Rating
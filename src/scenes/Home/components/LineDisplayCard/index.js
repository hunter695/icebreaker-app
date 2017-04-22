import styled from 'styled-components'
import React, { PropTypes } from 'react'

const Card = styled.main`
  display: flex;
  flex-direction: column;
  margin: 64px auto;
  min-width: 50%;
  width: 600px;
  min-height: 200px;
  background: white;
`

const LineDisplayCard = (props) => {
  if (!props.data) return null
  const { text, author, likes, dislikes } = props.data
  return (
    <Card>
      <p>{text}</p>
      <p>By: {author}</p>
      <p>Likes: {likes}</p>
      <p>Dislikes: {dislikes}</p>
    </Card>
  )
}

LineDisplayCard.propTypes = {
  data: PropTypes.shape(
    {
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      dislikes: PropTypes.number.isRequired,
    }
  ).isRequired,
}

export default LineDisplayCard

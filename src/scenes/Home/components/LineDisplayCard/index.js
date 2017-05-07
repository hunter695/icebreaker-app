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
    <Card className="line-display-card">
      <p>{text}</p>
      <p>By: {author}</p>
      <button onClick={props.onClickLike(1)}>Like: {likes}</button>
      <button onClick={props.onClickLike(-1)}>Dislike: {dislikes}</button>
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
  ),
  onClickLike: PropTypes.func.isRequired,
}

LineDisplayCard.defaultProps = {
  data: null,
}

export default LineDisplayCard

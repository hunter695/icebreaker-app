import styled from 'styled-components'
import React, { PropTypes } from 'react'

const Card = styled.main`
  position: relative;
  overflow: hidden;
  margin: 64px auto;
  min-width: 50%;
  width: 560px;
  min-height: 200px;
  background: white;
  border-radius: 5px;
`
const CardHeader = styled.div`
  position: absolute;
  width: 100%;
  height: 100px;
  padding-bottom: 30px;
`
const CardFooter = styled.div`
  position: absolute;
  bottom: 0;
  border-top-style: solid;
  border-width: 1px;
  border-color: #d1d1d1;
  width: 100%;
  height: 50px;
`
const Text = styled.p`
  margin: 15px;
`
const Author = styled.p`
  font-weight: bold;
  float: left;
  margin-left: 10px;
`
const Button = styled.button`
  float: right;
  margin: 10px;
  padding: 8px;
  color: white;
  background-color: #4caf50;
  border: none;
  width: 100px;
  border-radius: 5px;
`
const TwitterUser = styled.div`
  font-weight: bold;
  float: right;
  margin: 15px 10px;
`
const TwitterFooter = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  width: 100%;
`
/*
TODO: Home test issue failing due to PNG image being in the directory. Fix this,
and add TwitterLogo.
const TwitterLogo = styled.img`
  float: left;
  margin: 10px;
`
*/
const Retweets = styled.p`
  opacity: 0.5;
  position: absolute;
  right: 10px;
`

const TwitterError = styled.p`
  margin: 10px;
`

const LineDisplayCard = (props) => {
  if (!props.data) return null
  const { text, author, likes, dislikes } = props.data
  return (
    <Card className="line-display-card">
      <CardHeader>
        { text
          ? <Text>{text}</Text>
          : <TwitterError> Unable to retrieve tweet, please try again. </TwitterError>
        }
      </CardHeader>
      { props.isWild
        ? <CardFooter>
          { Object.prototype.hasOwnProperty.call(props.data, 'source')
            ? <TwitterFooter>
              <p>[TODO:Twitter logo here]</p>
              <TwitterUser>{author}</TwitterUser>
              <Retweets> Retweets: {props.data.retweet_count} </Retweets>
            </TwitterFooter>
            : <Author>{author}</Author>
          }
        </CardFooter>
        : <CardFooter>
          <Author>{author}</Author>
          <Button onClick={props.onClickLike(1)}>Like: {likes}</Button>
          <Button onClick={props.onClickLike(-1)}>Dislike: {dislikes}</Button>
        </CardFooter>
      }
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
      retweet_count: PropTypes.number.isRequired,
    }
  ),
  isWild: PropTypes.bool.isRequired,
  onClickLike: PropTypes.func.isRequired,
}

LineDisplayCard.defaultProps = {
  data: null,
}

export default LineDisplayCard

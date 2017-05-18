import styled from 'styled-components'
import React, { PropTypes } from 'react'

const twitterLogo = require('./twitterlogo.png')

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
  display: flex;
  bottom: 0;
  border-top-style: solid;
  border-width: 1px;
  border-color: #d1d1d1;
  width: 100%;
  height: 50px;
`
const Text = styled.p`
  font-size: 18px;
  margin: 15px;
`
const Author = styled.p`
  font-weight: bold;
  float: left;
  margin-left: 10px;
`
const Buttons = styled.div`
  position: absolute;
  right: 0;
`
const Button = styled.button`
  font-size: 18px;
  margin: 10px;
  padding: 6px;
  color: white;
  background-color: #4caf50;
  border: none;
  width: 90px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background-color: #399b3d;
    transform: translateY(2px);
  }
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

const TwitterLogo = styled.img`
  float: left;
  margin: 10px;
`

const Retweets = styled.p`
  opacity: 0.5;
  position: absolute;
  right: 15px;
`

const LikeDislike = styled.p`
  opacity: 0.5;
  margin-left: 20px;
`

const LineDisplayCard = (props) => {
  if (!props.data) return null
  const { text, author, likes, dislikes } = props.data
  return (
    <Card className="line-display-card">
      <CardHeader>
        { text
          ? <Text>{text}</Text>
          : <Text> Sorry, the user contributed database is empty. </Text>
        }
      </CardHeader>
      { props.isWild
        ? <CardFooter>
          { Object.prototype.hasOwnProperty.call(props.data, 'retweet_count')
            ? <TwitterFooter>
              <TwitterLogo src={twitterLogo} />
              <TwitterUser>{author}</TwitterUser>
              <Retweets> Retweets: {props.data.retweet_count} </Retweets>
            </TwitterFooter>
            : <Author>{author}</Author>
          }
        </CardFooter>
        : <CardFooter>
          <Author>{author}</Author>
          <LikeDislike>
            Like: {likes} &nbsp;
            Dislike: {dislikes}
          </LikeDislike>
          { props.renderButton
            ? <Buttons>
              <Button onClick={props.onClickLike(1)}>Like</Button>
              <Button onClick={props.onClickLike(-1)}>Dislike</Button>
            </Buttons>
            : null
          }

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
  renderButton: PropTypes.bool.isRequired,
  isWild: PropTypes.bool.isRequired,
  onClickLike: PropTypes.func.isRequired,
}

LineDisplayCard.defaultProps = {
  data: null,
}

export default LineDisplayCard

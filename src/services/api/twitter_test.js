import { getTweets, mostFavoritedTweet, store } from './twitter'

function storeMostFavoriteTweet() {
  let tweets
  getTweets('reactjs', 5,
    (twitterError, data, response) => {
      tweets = data.statuses
      console.log(`TWITTER RESPONSE: ${response.statusCode}`)
      // print text for each tweet
      tweets.forEach((t) => {
        console.log(`TWEET: ${t.text}`)
        console.log(`FAVORITE COUNT: ${t.favorite_count}`)
      })
      mostFavoritedTweet(tweets).then((mf) => {
        console.log(`MOST FAV TWEET: ${mf.text}`)
        // you need to put array bracket otherwise there is a id conflict
        store([mf])
      }).catch((e) => {
        console.log(e)
      })
    })
}

storeMostFavoriteTweet()

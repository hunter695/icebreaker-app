// const express = require('express')
const twit = require('twit') // module for interacting with Twitter API
const config = require('../../../config/config.js') // keys for twitter API
const mongodb = require('mongodb')

const T = twit(config.twitter)

/**
 * Primary function for populating wildcard database.
 * @param {string} content A string such as 'pickupline(s)' or 'icebreaker(s)'
 * @param {number} amount How many tweets you want back.
 * @param {requestCallback} callback Runs after successful Twitter API call.
 */
function getTweets(content, amount, callback) {
  const params = {
    q: `#${content} since:2011-11-11`,
    lang: 'en',
    result_type: 'popular',
    count: amount,
  }
  T.get('search/tweets', params, callback)
}
/**
 * Stores tweets into MongoDB database 'wildcard'
 * @param {Object[]} tweets Array of tweets in JSON
 */
function mostFavoritedTweet(tweets) {
  // array.prototype.map() creates a new array with returned value.
  const aggregatePromise = new Promise((resolve, reject) => {
    if (tweets.length === 0) {
      reject('No tweets to parse!')
    } else {
      let mostFavorited = tweets[0]
      tweets.forEach((t) => {
        if (t.favorite_count > mostFavorited.favorite_count) {
          mostFavorited = t
        }
      })
      resolve(mostFavorited)
    }
  })
  return aggregatePromise
}
/**
 * Stores tweets into MongoDB database 'wildcard'
 * @param {Object[]} tweets array of tweets in JSON
 */
function store(tweets) {
  const mongodbURL = config.mongodb.url
  const MongoClient = mongodb.MongoClient
  if (tweets.length > 0) {
    MongoClient.connect(mongodbURL, (mongodbError, db) => {
      if (mongodbError) {
        console.log('Unable to connect, error: ', mongodbError)
        // res.send(err); // from express
      } else {
        const collection = db.collection('wildcard')
        console.log('DB connected successfully')
        collection.insert(tweets, (insertError) => {
          // console.log(`DB insert result: ${records.ops[0]._id}`)
          if (insertError) {
            console.log(`insert error: ${insertError}`)
          } else {
            console.log('successful insertion')
          }
          db.close()
        })
      }
    })
  }
}

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
    tweets = mostFavoritedTweet(tweets).then((mf) => {
      console.log(`MOST FAV TWEET: ${mf.text}`)
      store([mf])
    })
  })

// const express = require('express')
import config from '../../../config/config' // keys for twitter API

const twit = require('twit') // module for interacting with Twitter API
const mongodb = require('mongodb')

const T = twit(config.twitter)

module.exports = {
  /**
   * Primary function for populating wildcard database.
   * @param {string} content A string such as 'pickupline(s)' or 'icebreaker(s)'
   * @param {number} amount How many tweets you want back.
   * @param {requestCallback} callback Runs after successful Twitter API call.
   */
  getTweets(content, amount, callback) {
    const params = {
      q: `#${content} since:2011-11-11`,
      lang: 'en',
      result_type: 'popular',
      count: amount,
    }
    T.get('search/tweets', params, callback)
  },
  /**
   * Returns a promise that resolves the most favorited tweet
   * @param {Object[]} tweets Array of tweets in JSON
   */
  mostFavoritedTweet(tweets) {
    const aggregatePromise = new Promise((resolve, reject) => {
      if (tweets.isArray && tweets.length === 0) {
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
  },
  /**
   * Stores tweets into MongoDB database 'wildcard'
   * @param {Object[]} tweets Array of tweets in JSON
   * @param {string} collectionToInsert MongoDB collection to store in.
   */
  store(tweets, collectionToInsert = 'wildcard') {
    const mongodbURL = config.mongodb.url
    const MongoClient = mongodb.MongoClient
    if (tweets.length > 0) {
      MongoClient.connect(mongodbURL, (mongodbError, db) => {
        if (mongodbError) {
          console.log('Unable to connect, error: ', mongodbError)
          // res.send(err); // from express
        } else {
          const collection = db.collection(collectionToInsert)
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
  },
}

# IceBreaker App

## Configuration Files

- From root directory of this project:

```sh
$ mkdir config && touch config/config.js
```
    
- Get your Twitter API keys: https://apps.twitter.com/
Inside "config/config.js" you should have:

```javascript
module.exports = {
twitter: {
consumer_key: '...',
consumer_secret: '...',
access_token: '...',
access_token_secret: '...',
timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
},
mongodb: {
url: 'mongodb://localhost:27017/icebreaker',
},
}
```

- Replace '...' with the corresponding keys.

## Install Dependencies

`yarn`

## Run Development Server

`yarn start`

`http://localhost:8080`



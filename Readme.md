# IceBreaker App

## Configuration Files
1. From root directory of this project:

	```sh
    $ mkdir config && touch config/config.js
    ```
    
2. Get your Twitter API keys: https://apps.twitter.com/
3. Inside "config/config.js" you should have:

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
    
4. Replace '...' with the corresponding keys.

## Install Dependencies

`yarn`

## Run Development Server

`yarn start`

`http://localhost:8080`



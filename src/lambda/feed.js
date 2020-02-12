const Parser = require('rss-parser')

export function handler(event, context, callback) {
  
  const FEEDS = [
    'tympanus.net/codrops/feed',
    'reddit.com/r/webdev/.rss',
    'blog.codepen.io/feed',
    'scotch.io/feed'
  ]

  let parser = new Parser()

  const feedRequests = FEEDS.map(feed => {
    return parser.parseURL(feed)
  })

  Promise.all(feedRequests).then(response => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  })
}
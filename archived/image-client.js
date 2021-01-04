// ES Modules syntax
import Unsplash from 'unsplash-js'

// require syntax
const APP_ACCESS_KEY = 'vYGZxXERDu-D4_sZNS3KKOEoEgaCi5GcbPLhwnlNswo'

const unsplash = new Unsplash({ accessKey: APP_ACCESS_KEY })

const ImageClient = new Unsplash({
  accessKey: APP_ACCESS_KEY,
  // Optionally you can also configure a custom header to be sent with every request
  headers: {
    'X-Custom-Header': 'foo',
  },
  // Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, you can configure the request timeout for all requests
  timeout: 500, // values set in ms
})

export default ImageClient

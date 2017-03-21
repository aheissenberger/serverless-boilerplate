export default class {
  constructor({ test }) {
    Object.assign(this, {
      test
    })
  }
  get() {
    return (event, context, cb) => {
      console.log(event)
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*",  //Required for CORS support to work
          "Access-Control-Allow-Credentials" : true,  //Required for cookies, authorization headers with HTTPS 
        },
        body: `${this.test} ${event.pathParameters.type}. Passt!`
      }
      return cb(null, response)
    }
  }
}

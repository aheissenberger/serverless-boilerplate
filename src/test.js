export default class {
  constructor({ test }) {
    Object.assign(this, {
      test
    })
  }
  get() {
    return (event, context, cb) => {

      console.log(event);

      function resolveAfter2Seconds(x) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(x);
          }, 1000);
        });
      }

      (async() => {
        console.log('Start await')
        var a = await resolveAfter1Seconds(10);
        console.log('FINS await',a);
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin" : "*",  //Required for CORS support to work
            "Access-Control-Allow-Credentials" : true,  //Required for cookies, authorization headers with HTTPS 
          },
          body: `${this.test} ${event.pathParameters.type}. Passt! Passt`
        }
        return cb(null, response)
      })();

    }
  }
}

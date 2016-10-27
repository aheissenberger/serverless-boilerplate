import Promise from 'bluebird'

export default class {
  constructor({ test }) {
    Object.assign(this, {
      test
    })
  }
  get() {
    return (event, context, cb) => {
      return cb(null, `${this.test} ${event.path.type}.`)
    }
  }
}

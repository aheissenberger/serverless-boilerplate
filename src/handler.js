require('dotenv').config()

import TestHandler from './test'

const handler = new TestHandler({ test: process.env.TEST_ENV })

export const testHandler = handler.get()

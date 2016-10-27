require('dotenv').config()

import Promise from 'bluebird'

import TestHandler from './test'

const handler = new TestHandler({ test: process.env.TEST_ENV })

export const testHandler = handler.get()

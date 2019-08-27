import mongoose from 'mongoose'
require('dotenv').config()

export const connect = (url = process.env.DB_URL, opts = {}) => {
  return mongoose.connect(
    url,
    {...opts, useNewUrlParser: true}
  )
}

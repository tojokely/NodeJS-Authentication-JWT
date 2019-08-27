require('dotenv').config()
const SERVER_PORT = process.env.SERVER_PORT

import express from 'express'
import { connect } from './utils/db'
import { json, urlencoded } from 'body-parser'

//import routes
import { signup, signin, protect } from './utils/auth'
import userRouter from './resources/user/user.router'

// Define app
export const app = express()

// Form Handling
app.use(json())
app.use(urlencoded({ extended: true }))

// Routes Middleware
app.get('/', protect, (req, res) => {
  // user if from token
  res.send(req.user);
  
  // to find user info
  /*
    * User.findById({_id: req.user._id})
  */
});
app.post('/signin', signin)
app.post('/signup', signup)
app.use('/api/user', userRouter)

// Entry function in index.js
export const start = async () => {
  try {
      await connect()
      app.listen(SERVER_PORT, () =>
       // idk why SERVER_PORT is undefined 👇
      console.log(`Running on http://localhost:${SERVER_PORT}/`),
    );
  } catch (e) {
    console.error(e)
  }
}

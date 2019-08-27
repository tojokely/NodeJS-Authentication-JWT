import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { User } from '../resources/user/user.model.js'
import { registerValidation, loginValidation } from './validation'

// Create Token for New User
export const newToken = user => {
  return jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP
  })
}

// Verify Token for Existing User
export const verifyToken = token =>
  new Promise((resolve, reject) => {
     jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      resolve(payload)
    })
 })

export const signup = async (req,res) => {
    // Destructuring assignment of error
    const {error} = registerValidation(req.body)
    if(error) res.status(400).send(error.details[0].message)

    // Check if user in database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exists.')

    // Create user
    try {
       const user = await User.create(req.body)
       res.status(200).send({data: user})
     } catch (e) {
       console.error(e)
   }
}

export const signin = async (req,res) => {
  // Destructuring assignment of error
  const {error} = loginValidation(req.body)
  if(error) res.status(400).send(error.details[0].message)

  // Check user in database
  const user = await User.findOne({email: req.body.email}).exec()

  if(!user) {
    res.status(401).send('User does not exist. Sign up.')
  }

  // Check if there's a password match
  try {
    const match = await user.checkPassword(req.body.password)
    if(!match){
       return res.status(401).send({message: 'Invalid Password'})
    }
    // Create and assign token
    const token = newToken(user)
    // Assign to header
    res.header('authToken', token).send(token)
  } catch(e) {
    console.error(e)
    return res.status(401).send({message: 'We were not able to log you in.'})
  }
}

export const protect = async (req, res, next) => {
  // Check if headers has auth-Token
  let token = req.header('authToken')
  if(!token){
    return res.status(401).send('Access Denied.')
  }

  try {
    // verifyToken() returns payload and is stored in verified
    const verified = await verifyToken(token)
    const user = await User.findById(verified.id)
            .select('-password')
            .lean() //converts it to json
            .exec()
    // store token in req.user [instead of full info]
    req.user = verified
    next()
  } catch(e) {
      console.log(verifyToken(token))
      return res.status(401).send('Invalid Token')
  }
  next()
}

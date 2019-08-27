import { Router } from 'express'
import { me, updateMe } from './user.controllers'
import { User } from './user.model'
import mongoose from 'mongoose'

const router = Router()

router.get('/', me)
router.put('/', updateMe)
router.get('/find-all', async (req, res) => {
  const user = await User.find().lean().exec()
  console.log('finding it')
  res.send(user)
})

export default router

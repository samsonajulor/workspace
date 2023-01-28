import { Request, Response, NextFunction } from 'express'
require('dotenv').config()
import bcrypt from 'bcrypt'
import { UserType, User, validateSignUp } from '../model/userModel'
import _ from 'lodash'
import JWT from 'jsonwebtoken'

export const signToken = (user: UserType) => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user._id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, process.env.JWT_SECRET as string);
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const { error } = validateSignUp(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const { firstName, lastName, email, phoneNumber, password } = req.body
  try {
    let user: UserType = await User.findOne({ $or: [{ email }, { phoneNumber }] })

    if (user) return res.status(400).send('User exists')

    const newUser = await User.create({
      firstName, lastName, email, phoneNumber, password: await bcrypt.hash(password, 10),
    })

  } catch (err: any) {
    return res.status(500).json(err.message)
  }
}
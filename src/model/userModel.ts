import mongoose, { Schema, model, Document, Types } from 'mongoose'
import joi from 'joi'
import jwt from 'jsonwebtoken'
require('dotenv').config()

export interface UserType {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  _id: string
  uid: String,
  token: String,
  name: String,
  gender: String,
  pic: String
}

//Build a User Schema
const UserSchema = new mongoose.Schema({
  uid: String,
  token: String,
  name: String,
  gender: String,
  pic: String,
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Enter your first name'],
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Enter your last name'],
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    max: 50,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    unique: true,
  },
  phoneNumber: {
    type: String,
    match: [
      /((^090)([23589]))|((^070)([1-9]))|((^080)([2-9]))|((^081)([0-9]))(\d{7})/,
      'Please enter 11 digits valid Nigeria mobile number',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Enter your password'],
    min: 5,
    max: 200,
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
})

//user joi validation 
export function validateSignUp(user: UserType) {
  const schema = joi.object({
    firstName: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    email: joi.string().email().max(50).required(),
    phoneNumber: joi.string().length(11).required(),
    password: joi.string().min(5).max(200).required(),
  })
  return schema.validate(user)
}

export let User = mongoose.model('User', UserSchema)
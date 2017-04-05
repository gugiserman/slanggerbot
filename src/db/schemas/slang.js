import mongoose from 'mongoose'
import { userSchema, chatSchema } from './index'

const dateDescriptor = {
  $$type: Date,
  default: Date.now()
}

const slangSchema = mongoose.Schema({
  keyword: String,
  response: String,
  date: dateDescriptor,
  author: userSchema,
  lastUpdate: {
    author: userSchema,
    date: dateDescriptor,
  },
  chat: chatSchema,
}, {
  typeKey: '$$type',
})

export default slangSchema

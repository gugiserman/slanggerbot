import mongoose from 'mongoose'

const chatSchema = mongoose.Schema({
  id: Number,
  title: String,
  type: String,
})

export default chatSchema

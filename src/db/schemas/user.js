import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  id: Number,
  username: String,
  first_name: String,
  last_name: String,
})

export default userSchema

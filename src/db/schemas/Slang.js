import mongoose from 'mongoose'

const dateSchema = {
  type: Date,
  default: Date.now()
}

const authorSchema = {
  id: Number,
  first_name: String,
  last_name: String,
}

const slangSchema = mongoose.Schema({
  keyword: String,
  response: String,
  date: Date,
  author: authorSchema,
  lastUpdate: {
    author: authorSchema,
    date: dateSchema,
  },
})

export default mongoose.model('Slang', slangSchema)

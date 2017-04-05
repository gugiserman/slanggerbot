import mongoose from 'mongoose'
import { slangSchema } from '../schemas'

const Slang = mongoose.model('Slang', slangSchema)

export default Slang

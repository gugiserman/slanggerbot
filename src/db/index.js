import mongoose from 'mongoose'

const { SLANGGER_BOT_MONGO_PASSWORD } = process.env
const mLabURI = `mongodb://slanggerbot:${SLANGGER_BOT_MONGO_PASSWORD}@ds011379.mlab.com:11379/heroku_g1d0pbjb`

mongoose.connect(mLabURI)

export default mongoose.connection

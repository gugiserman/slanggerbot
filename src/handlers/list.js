import { Slang } from '../db/models'

const listHandler = (context) => {
  Slang.find().then((slangs) => {
    context.reply(slangs)
  })
}

export default listHandler

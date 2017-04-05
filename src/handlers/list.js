import { Slang } from '../db/schemas'

const listHandler = (context) => {
  Slang.find().then((slangs) => {
    context.reply(slangs)
  })
}

export default listHandler

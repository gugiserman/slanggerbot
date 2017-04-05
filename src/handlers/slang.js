import { Extra } from '../telegraf'
import { Slang } from '../db/models'

const slangHandler = (context) => {
  const { id, text, chat } = context.message

  Slang.findOne({ keyword: text, 'chat.id': chat.id }).then((slang) => {
    if (slang) {
      context.reply(slang.response, Extra.inReplyTo(id))
    }
  })
}

export default slangHandler

import { Extra } from '../telegraf'
import { Slang } from '../db/models'

const slangHandler = (context, next) => {
  const { id, text, chat } = context.message

  Slang.findOne({ keyword: text, 'chat.id': chat.id }).then((slang) => {
    if (!slang) {
      return next()
    }

    context.reply(slang.response, Extra.inReplyTo(id))
  })
}

export default slangHandler

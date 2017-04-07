import { Extra } from '../telegraf'
import { Slang } from '../db/models'

const slangHandler = (context, next) => {
  const { message_id, text, chat } = context.message

  Slang.findOne({ keyword: text, 'chat.id': chat.id }).then((slang) => {
    if (!slang || !slang.response) {
      return next()
    }

    context.reply(
      slang.response,
      Extra.inReplyTo(message_id),
    )
  })
}

export default slangHandler

import { Extra } from '../telegraf'
import { Slang } from '../db/models'
import { isCommandValid } from '../utils'

const delHandler = (context, done) => {
  const { message_id, chat, text, entities } = context.message
  const offset = entities[0].length

  if (!isCommandValid(text, '/del', offset)) {
    return done()
  }

  const textOffset = offset + 1
  const keyword = text.slice(textOffset)

  Slang.findOneAndRemove({ keyword: keyword, 'chat.id': chat.id }).then((slang) => {
    if (!slang) {
      return context.reply(
        `"${keyword}" not found :(`,
        Extra.inReplyTo(message_id),
      )
    }

    context.reply(
      `"${keyword}" deleted!`,
      Extra.inReplyTo(message_id),
    )
  })
}

export default delHandler

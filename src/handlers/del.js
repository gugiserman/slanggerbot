import { Extra } from '../telegraf'
import { Slang } from '../db/models'

const delHandler = (context) => {
  const { message_id, chat, text, entities } = context.message
  const textOffset = (entities[0].length + 1)
  const keyword = text.slice(textOffset)

  Slang.findOneAndRemove({ keyword: keyword, 'chat.id': chat.id }).then(() =>
    context.reply(`"${keyword}" deleted!`, Extra.inReplyTo(message_id))
  )
}

export default delHandler

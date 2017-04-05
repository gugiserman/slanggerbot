import { Extra } from '../telegraf'
import { Slang } from '../db/models'

const addHandler = (context) => {
  const { message_id, from, chat, date, text, entities } = context.message
  const textOffset = (entities[0].length + 1)

  const body = text.slice(textOffset)
  const [keyword, response] = body.split(/\s(.+)/).map((part) => part.replace(/"/g, ''))

  const slang = new Slang({
    keyword: keyword,
    response: response,
    author: from,
    chat: chat,
    lastUpdate: {
      author: from,
    },
  })

  Slang.count({ keyword: keyword, 'chat.id': chat.id }).then((count) => {
    if (count) {
      return context.reply(`"${keyword}" already exists. See /update`, Extra.inReplyTo(message_id))
    }

    slang.save().then(() =>
      context.reply(`"${keyword}" saved!`, Extra.inReplyTo(message_id))
    )
  })
}

export default addHandler

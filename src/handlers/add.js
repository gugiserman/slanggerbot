import { Extra } from '../telegraf'
import { Slang } from '../db/models'
import { isCommandValid, removeLineBreaks } from '../utils'

const addHandler = (context, done) => {
  const { message_id, from, chat, date, text, entities } = context.message
  const offset = entities[0].length

  if (!isCommandValid(text, '/add', offset)) {
    return done()
  }

  const textOffset = offset + 1
  const body = text.slice(textOffset)
  const [keyword, response] = body.split(/"\s/).map((part) => part.replace(/"/g, ''))

  if (!keyword.length || !response.length) {
    return context.reply(
      `Sorry, I can't understand your new slang :(`,
      Extra.inReplyTo(message_id),
    )
  }

  const slang = new Slang({
    keyword: removeLineBreaks(keyword),
    response: removeLineBreaks(response),
    author: from,
    chat: chat,
    lastUpdate: {
      author: from,
    },
  })

  Slang.count({ keyword: keyword, 'chat.id': chat.id }).then((count) => {
    if (count) {
      return context.reply(
        `"${keyword}" already exists. See /update`,
        Extra.inReplyTo(message_id),
      )
    }

    Slang.find({ 'author.id': from.id, 'chat.id': chat.id }).then(userSlangs => {
      if (userSlangs && userSlangs.length >= 3) {
        const userSlangsKeywords = userSlangs.map(userSlang => `<b>${userSlang.keyword}</b>`)

        return context.replyWithHTML(`
          You can only have up to 3 slangs.
          Your slangs:
          ${userSlangKeywords.join(', ')}.
        `)
      }

      slang.save().then(() =>
        context.reply(
          `"${keyword}" saved!`,
          Extra.inReplyTo(message_id),
        )
      )

    })
  })
}

export default addHandler

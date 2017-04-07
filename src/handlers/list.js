import moment from 'moment'
import { Extra } from '../telegraf'
import { Slang } from '../db/models'
import { isCommandValid } from '../utils'

const listHandler = (context, done) => {
  const { message_id, text, chat, entities } = context.message
  const offset = entities[0].length

  if (!isCommandValid(text, '/list', offset)) {
    return done()
  }

  Slang.find({ 'chat.id': chat.id }).then((slangs) => {
    if (!slangs.length) {
      context.reply('No keywords found :( See /add', Extra.inReplyTo(message_id))
    }

    const body = slangs.map((slang) => {
      const {
        keyword,
        response,
        date,
        author: {
          first_name,
          username,
        },
      } = slang

      const when = moment(new Date(date)).fromNow()
      let entry = `${keyword}: ${response} | ${when} by ${first_name} `

      if (username && username.length) {
        entry += `(@${username}) `
      }

      return entry
    }).join("\n")

    context.reply(body, Extra.inReplyTo(message_id))
  })
}

export default listHandler

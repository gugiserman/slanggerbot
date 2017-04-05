import moment from 'moment'
import { Extra } from '../telegraf'
import { Slang } from '../db/models'

const listHandler = (context) => {
  const { message_id, chat } = context.message

  Slang.find({ 'chat.id': chat.id }).then((slangs) => {
    if (!slangs.length) {
      context.reply('No keywords found :( See /add')
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

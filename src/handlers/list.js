import moment from 'moment'
import { Extra } from '../telegraf'
import { Slang } from '../db/models'
import { isCommandValid } from '../utils'

const TELEGRAM_CHAR_CAP = 4096

const listHandler = (context, done) => {
  const { message_id, text, chat, entities } = context.message
  const offset = entities[0].length
  const expectedCommand = '/list'

  if (!isCommandValid(text, expectedCommand, expectedCommand.length)) {
    return done()
  }

  const offsetText = offset + 1
  const search = text.slice(offsetText)

  let query = {
    'chat.id': chat.id,
  }

  if (search && search.length) {
    query = Object.assign(query, {
      keyword: new RegExp(`(?:^|\s)(${search})(?=\s|$)`, 'gi'),
    })
  }

  Slang.find(query, null, { sort: '-date' }).then((slangs) => {
    if (!slangs.length) {
      return context.reply(
        'No keywords found :( See /add',
        Extra.inReplyTo(message_id),
      )
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
      let entry = `<b>${keyword}</b>: <i>${response}</i> | ${when} by ${first_name} `

      if (username && username.length) {
        entry += `(@${username}) `
      }

      return entry
    })

    let chunks = []
    const replies = []

    body.forEach((entry, index) => {
      let chunk = entry

      if (index < (body.length - 1)) {
        chunk += "\n"
      }

      if ((chunks.join('') + chunk).length > TELEGRAM_CHAR_CAP) {
        replies.push(chunks)
        chunks = [chunk]
      } else {
        chunks.push(chunk)
      }
    })

    if (chunks.length) {
      replies.push(chunks)
    }

    replies.forEach((reply) => {
      context.replyWithHTML(
        reply.join(''),
        Extra.inReplyTo(message_id),
      )
    })
  })
}

export default listHandler

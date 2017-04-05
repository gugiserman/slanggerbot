import moment from 'moment'
import { Slang } from '../db/models'

const listHandler = (context) => {
  const { chat } = context.message

  Slang.find({ 'chat.id': chat.id }).then((slangs) => {
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
      let entry = `<b>${keyword}</b>: ${response} | ${when} by ${first_name} `

      if (username && username.length) {
        entry += `(@${username}) `
      }

      return entry
    }).join("\n")

    context.reply(body)
  })
}

export default listHandler

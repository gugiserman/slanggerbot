import { Slang } from '../db/models'

const delHandler = (context) => {
  const { chat, text, entities } = context.message
  const textOffset = (entities[0].length + 1)
  const keyword = text.slice(textOffset)

  Slang.remove({ keyword: keyword, 'chat.id': chat.id }).then(() =>
    context.reply(`"${keyword}" deleted!`)
  )
}

export default delHandler

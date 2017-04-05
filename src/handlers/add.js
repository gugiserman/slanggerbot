import { Slang } from '../db/schemas'

const addHandler = (context) => {
  console.log('Text:', context.text)
  console.log('Message:', context.message)
}

export default addHandler

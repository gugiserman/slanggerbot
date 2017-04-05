/* Libs */
import Telegraf from './telegraf'

/* Modules */
import db from './db'

/* Constants */
const { SLANGGER_BOT_URL, SLANGGER_BOT_TOKEN, PORT } = process.env

/* Bot app */
const app = new Telegraf(SLANGGER_BOT_TOKEN)

/* App configuration */
app.telegram.getMe().then((botInfo) => {
  app.options.username = botInfo.username
})

db.once('open', () => {
  app.telegram.setWebhook(`${SLANGGER_BOT_URL}/bot${SLANGGER_BOT_TOKEN}`);
  app.startWebhook(`/bot${SLANGGER_BOT_TOKEN}`, null, PORT || 3000)
})

export default app

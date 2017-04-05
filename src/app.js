/* Libs */
import Telegraf from './telegraf'

/* Constants */
const { SLANGGER_BOT_URL, SLANGGER_BOT_TOKEN, PORT } = process.env

/* Bot app */
const app = new Telegraf(SLANGGER_BOT_TOKEN)

/* App configuration */
app.telegram.getMe().then((botInfo) => {
  app.options.username = botInfo.username
})

app.telegram.setWebhook(`${SLANGGER_BOT_URL}/bot${SLANGGER_BOT_TOKEN}`);
app.startWebhook(`/bot${SLANGGER_BOT_TOKEN}`, null, PORT || 3000)

export default app

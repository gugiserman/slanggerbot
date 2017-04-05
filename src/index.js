/* Bot app */
import app from './app'

/* Handlers */
import {
  slangHandler,
  listHandler,
  addHandler,
  delHandler,
} from './handlers'

/* Listeners */
app.on('text', slangHandler)
app.command('list', listHandler)
app.command('add', addHandler)
app.command('del', delHandler)

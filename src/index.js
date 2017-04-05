/* Bot app */
import app from './app'

/* Handlers */
import {
  listHandler,
  addHandler,
  delHandler,
} from './handlers'

/* Listeners */
app.command('list', listHandler)
app.command('add', addHandler)
app.command('del', delHandler)

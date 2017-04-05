/* Bot app */
import app from './app'

/* Handlers */
import {
  listHandler,
  addHandler,
} from './handlers'

/* Listeners */
app.command('list', listHandler)
app.command('add', addHandler)

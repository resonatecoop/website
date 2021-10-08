import 'regenerator-runtime/runtime.js'
import choo from 'nanochoo' // resonatecoop/nanochoo (fork of nanochoo with added support for cached components)
import './tabbing.js'
import Header from './components/header'

const app = choo()

app.use((state, emitter, app) => {
  state.search = state.search || {
    q: ''
  }

  state.user = {}
  state.params = {} // nanochoo does not have a router

  emitter.on('search', (q) => {
    window.open(`https://beta.stream.resonate.coop/search?q=${q}`, '_blank')
  })
})

app.view((state, emit) => {
  return state.cache(Header, 'header').render()
})

app.mount('.search')

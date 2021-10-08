import 'regenerator-runtime/runtime.js'
import Nanocomponent from 'nanocomponent'
import nanostate from 'nanostate'
import choo from 'nanochoo' // resonatecoop/nanochoo (fork of nanochoo with added support for cached components)
import html from 'nanohtml'
import icon from '@resonate/icon-element'
import Search from '@resonate/search-component'

import './tabbing.js'

const app = choo()

app.use((state, emitter, app) => {
  state.search = state.search || {
    q: ''
  }

  state.user = {}
  state.params = {} // nanochoo does not have a router

  state.cache(Search, 'search')

  emitter.on('search', (q) => {
    window.open(`https://beta.stream.resonate.coop/search?q=${q}`, '_blank')
  })
})

app.view((state, emit) => {
  return state.cache(Header, 'header').render()
})

app.mount('.search')

// Header component
class Header extends Nanocomponent {
  constructor (id, state, emit) {
    super(id)

    this.state = state
    this.emit = emit
    this.local = state.components[id] = {}

    this.local.tags = [
      'ambient',
      'acoustic',
      'alternative',
      'electro',
      'electronic',
      'experimental',
      'folk',
      'funk',
      'hiphop',
      'house',
      'indie',
      'instrumental',
      'jazz',
      'metal',
      'pop',
      'punk'
    ]

    this.local.machine = nanostate.parallel({
      search: nanostate('off', {
        on: { toggle: 'off' },
        off: { toggle: 'on' }
      })
    })

    this.local.machine.on('search:toggle', () => {
      this.rerender()
      if (this.local.machine.state.search === 'on') {
        const input = document.querySelector('input[type="search"]')
        if (input && input !== document.activeElement) input.focus()
      }
      document.body.classList.toggle('search-open', this.local.machine.state.search === 'on')
    })
  }

  createElement () {
    const machine = {
      on: () => this.state.cache(Search, 'search').render({ tags: this.local.tags }),
      off: () => {
        const attrs = {
          onclick: (e) => {
            this.local.machine.emit('search:toggle')
          },
          class: 'bn mr4 mr0-l pa0 bg-transparent'
        }
        return html`
          <button ${attrs}>
            <div class="flex items-center justify-center">
              ${icon('search', { size: 'sm' })}
              <span class="dn db-l pl3 near-black near-black--light near-white--dark">Search</span>
            </div>
          </button>
        `
      }
    }[this.local.machine.state.search]

    return html`
      <li role="menuitem" class="search flex w-100 flex-auto justify-end justify-center-l">
        ${machine()}
      </li>
    `
  }

  update () {
    return false
  }
}

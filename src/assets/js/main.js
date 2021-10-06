import 'regenerator-runtime/runtime.js'
import './tabbing.js'
import Search from '@resonate/search-component'
import choo from 'nanochoo' // resonatecoop/nanochoo (fork of nanochoo with added support for cached components)
import html from 'nanohtml'

document.addEventListener('DOMContentLoaded', DOMContentLoaded)

function DOMContentLoaded () {
  // nav()
  search('.search')
}

function search (selector) {
  if (!document.querySelector(selector)) {
    console.log(`${selector} element not found`)
    return
  }

  const app = choo()

  app.use((state, emitter, app) => {
    state.search = state.search || {
      notFound: false,
      q: '',
      results: [],
      placeholder: 'search by name, artist, album, tag'
    }

    state.user = {}
    state.params = {} // nanochoo does not have a router

    state.cache(Search, 'search')
  })

  app.view((state, emit) => {
    return html`
      <div class="search flex-l flex-auto-l w-100-l justify-center-l">
        ${state.cache(Search, 'search').render({
          tags: [
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
        })}
      </div>
    `
  })

  app.mount(selector)
}

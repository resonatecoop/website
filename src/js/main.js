import onIntersect from 'on-intersect'
import animation from 'nanoanimation'
import Search from '@resonate/search-component'
import choo from 'nanochoo' // resonatecoop/nanochoo (fork of nanochoo with added support for cached components)
import html from 'nanohtml'

document.addEventListener('DOMContentLoaded', DOMContentLoaded)

function DOMContentLoaded () {
  // nav()
  tabbing()
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

/**
 * Animate and change navbar background color on scroll
 */

function nav () {
  const nav = document.querySelector('header')
  const target = document.createElement('div')
  target.style.position = 'absolute'
  target.style.top = '0px'
  target.style.left = '0px'
  document.body.appendChild(target)

  onIntersect(target, { root: null, rootMargin: '100px' }, () => {
    const animate = animation([
      { transform: 'translateY(100%)' },
      { transform: 'translateY(0)' }
    ], {
      duration: 300,
      fill: 'forwards'
    })
    const move = animate(nav)
    nav.style.position = 'relative'
    nav.style.backgroundColor = 'transparent'
    nav.style.color = 'var(--black)'
    move.play()
  }, () => {
    const animate = animation([
      { transform: 'translateY(-100%)' },
      { transform: 'translateY(0)' }
    ], {
      duration: 300,
      fill: 'forwards'
    })
    const move = animate(nav)
    nav.style.position = 'sticky'
    nav.style.top = '-1px'
    nav.style.backgroundColor = 'var(--black)'
    nav.style.color = 'var(--white)'
    move.play()
  })
}

/**
 * Enable back focus on tabs when user is tabbing
 */

function tabbing () {
  window.addEventListener('keydown', handleFirstTab)

  function handleFirstTab (e) {
    if (e.keyCode === 9) {
      document.body.classList.add('user-is-tabbing')

      window.removeEventListener('keydown', handleFirstTab)
      window.addEventListener('mousedown', handleMouseDownOnce)
    }
  }

  function handleMouseDownOnce () {
    document.body.classList.remove('user-is-tabbing')

    window.removeEventListener('mousedown', handleMouseDownOnce)
    window.addEventListener('keydown', handleFirstTab)
  }
}

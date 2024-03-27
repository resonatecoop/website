import 'regenerator-runtime/runtime.js'
import choo from 'nanochoo' // resonatecoop/nanochoo (fork of nanochoo with added support for cached components)
import './tabbing.js'
import Header from './components/header'
import RandomLogo from './components/logo'
import ContactForm from './components/contact'
// import loadScript from './lib/load-script'

function headerSearchApp (selector) {
  if (!document.querySelector(selector)) return

  const app = choo()

  app.use((state, emitter, app) => {
    state.search = state.search || {
      q: ''
    }

    state.user = {}
    state.params = {} // nanochoo does not have a router

    emitter.on('search', (q) => {
      const bang = q.startsWith('#')
      const pathname = bang ? '/tag' : '/search'
      const url = new URL(pathname, process.env.APP_HOST || 'http://localhost')
      const params = bang ? { term: q.split('#')[1] } : { q }
      url.search = new URLSearchParams(params)
      return window.open(url.href, '_blank')
    })
  })

  app.view((state, emit) => {
    return state.cache(Header, 'header').render()
  })

  app.mount(selector)
}

async function contactApp (selector) {
  if (!document.querySelector(selector)) return

  // await loadScript('https://js.hcaptcha.com/1/api.js')

  const contact = choo()

  contact.view((state, emit) => {
    return state.cache(ContactForm, 'contact').render()
  })

  contact.mount(selector)
}

function randomLogoApp (selector) {
  if (!document.querySelector(selector)) return

  const logo = choo()

  logo.view((state, emit) => {
    return state.cache(RandomLogo, 'logo').render({
      invert: window.location.pathname.startsWith('/coop') ? -1 : 1
    })
  })

  logo.mount(selector)
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)

function DOMContentLoaded () {
  contactApp('.contact-form')
  randomLogoApp('.random-logo-component')
  headerSearchApp('.search')
}

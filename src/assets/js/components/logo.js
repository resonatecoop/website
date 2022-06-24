import Nanocomponent from 'nanocomponent'
import html from 'nanohtml'

const ASSETS_PATH = 'https://static.resonate.is/pwa_assets'

const POSITIONS = [
  0,
  12.5,
  25,
  37.5,
  50,
  62.5,
  75,
  87.5,
  100
]

/**
 * Display random logo on load
 * Iterate over possible background positions on click/right click
 */
class RandomLogo extends Nanocomponent {
  constructor (id, state, _emit) {
    super(id)

    this.local = state.components[id] = {}

    this.local.current = null
    this.local.pos = POSITIONS[this.local.current]
  }

  createElement (props) {
    this.local.invert = props.invert

    const attrs = {
      oncontextmenu: e => {
        e.preventDefault()
        this.next(-1)
      },
      onclick: () => this.next(),
      class: 'mx3 grow ma0 db aspect-ratio aspect-ratio--1x1'
    }

    const src = ASSETS_PATH + '/sprite_optimized.png'

    const style = `background-position:0 ${this.local.pos}%;background-repeat:no-repeat;background-image:url(${src});filter:invert(${this.local.invert})`

    return html`
      <div class="random-logo-component w-100 w-30-m w-40-l ph4 pa4-ns">
        <figure ${attrs}>
          <span role="img" class="aspect-ratio--object cover random-logo" style=${style}></span>
          <figcaption class="clip">Resonate Coop Logo</figcaption>
        </figure>
      </div>
    `
  }

  load (el) {
    this.element.querySelector('.random-logo').style.backgroundImage =
      'url(https://static.resonate.is/pwa_assets/sprite_optimized.png)'
    this.next()
  }

  update () {
    return false
  }

  next (step = 1) {
    const img = this.element.querySelector('.random-logo')

    this.local.current = this.local.current === null
      ? Math.floor(Math.random() * POSITIONS.length)
      : (this.local.current + step + POSITIONS.length * 100) % POSITIONS.length

    this.local.pos = POSITIONS[this.local.current]

    img.style.backgroundPosition = `0 ${this.local.pos}%`
  }
}

export default RandomLogo

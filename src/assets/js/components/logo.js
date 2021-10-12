import Nanocomponent from 'nanocomponent'
import html from 'nanohtml'

const ASSETS_PATH = 'https://static.resonate.is/pwa_assets'

/**
 * Display random logo on load
 * Iterate over possible background positions on click/right click
 */

class RandomLogo extends Nanocomponent {
  constructor (id, state, emit) {
    super(id)

    this.local = state.components[id] = {}

    this.local.positions = [
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

    this.local.current = 0
    this.local.pos = this.local.positions[this.local.current]
  }

  createElement () {
    const attrs = {
      oncontextmenu: e => {
        e.preventDefault()
        const img = this.element.querySelector('.random-logo')
        this.local.current = this.local.current - 1
        if (this.local.current < 0) {
          this.local.current = 8
        }
        this.local.pos = this.local.positions[this.local.current]

        img.style.backgroundPosition = `0 ${this.local.pos}%`
        return false
      },
      onclick: e => {
        const img = this.element.querySelector('.random-logo')
        this.local.current = this.local.current + 1
        if (this.local.current === this.local.positions.length) {
          this.local.current = 0
        }
        this.local.pos = this.local.positions[this.local.current]

        img.style.backgroundPosition = `0 ${this.local.pos}%`
      },
      class: 'mx3 grow ma0 db aspect-ratio aspect-ratio--1x1 invert--dark'
    }

    const src = ASSETS_PATH + '/sprite_optimized.png'

    const style = `background-position:0 ${this.local.pos}%;background-repeat:no-repeat;background-image:url(${src});`

    return html`
      <div class="random-logo-component w-100 w-30-m w-40-l pa4">
        <figure ${attrs}>
          <span role="img" class="aspect-ratio--object cover random-logo" style=${style}></span>
          <figcaption class="clip">Resonate Coop Logo</figcaption>
        </figure>
      </div>
    `
  }

  load (el) {
    const img = this.element.querySelector('.random-logo')

    this.local.current = Math.floor(Math.random() * this.local.positions.length - 1) // random index position
    this.local.pos = this.local.positions[this.local.current]

    img.style.backgroundPosition = `0 ${this.local.pos}%`
    img.style.backgroundImage = 'url(https://static.resonate.is/pwa_assets/sprite_optimized.png)'
  }

  update () {
    return false
  }
}

export default RandomLogo

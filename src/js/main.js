/* global fetch */
import 'regenerator-runtime/runtime.js'
import onIntersect from 'on-intersect'
import animation from 'nanoanimation'
import choo from 'nanochoo' // resonatecoop/nanochoo (fork of nanochoo with added support for cached components)
import html from 'nanohtml'
import Player from '@resonate/player-component'
import Track from '@resonate/track-component'

const imagePlaceholder = (w, h) => {
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'${w}' height%3D'${h}' viewBox%3D'0 0 ${w} ${h}'%2F%3E`
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)

function DOMContentLoaded () {
  nav()
  tabbing()
  player('#player')
}

/**
 * WIP
 * Adds our player component to the dom
 * It does fetch data from our public upload tool api (stream2own player api should be able to provide similar data)
 * The player component needs to be refactored to better adapt to future api changes
 */

async function player (selector) {
  if (!document.querySelector(selector)) {
    console.log(`${selector} element not found`)
    return
  }

  const url = new URL('/api/trackgroups/1da238d9-fb1d-4e9b-8c82-9431654e0826', 'https://upload.resonate.is')
  const release = await (await fetch(url.href, { mode: 'cors' })).json()

  const _state = {}

  _state.release = release.data
  _state.track = release.data.items[0].track

  const app = choo()

  app.use((state, emitter, app) => {
    Object.assign(state, _state)

    state.cache(Player, 'player-footer')

    const player = state.cache(Player, 'player-footer')

    document.body.appendChild(html`
      <div class="bg-white black shadow-contour fixed bottom-0 right-0 left-0 w-100 z-max">
        ${player.render({
          track: {
            id: state.track.id,
            title: state.track.title,
            duration: state.track.duration,
            status: 'paid',
            cover: state.release.cover
          },
          playlist: [
            {
              trackGroup: [state.release],
              count: 0,
              fav: 0,
              track: {
                id: state.track.id,
                title: state.track.title,
                duration: state.track.duration,
                status: 'paid',
                cover: state.release.cover
              },
              src: `https://api.resonate.is/v1/stream/${state.track.id}`
            }
          ],
          trackGroup: [state.release],
          src: `https://api.resonate.is/v1/stream/${state.track.id}`,
          fav: 0,
          count: 0,
          setUrl: (url) => {
            return url
          }
        })}
      </div>
    `)
  })

  app.view((state, emit) => {
    const src = state.release.cover ? state.release.cover : imagePlaceholder(400, 400)

    return html`
      <section id="player" class="w-100 mw9 center h-auto mt2 mt3-l bg-black pa0 flex flex-wrap items-start white">
        <div class="fl w-60-ns w100-l w100 pa0">
          <div class="sticky aspect-ratio aspect-ratio--1x1 bg-dark-gray bg-dark-gray--dark" style="top:3rem">
            <figure class="ma0">
              <img src=${src} width=400 height=400 class="aspect-ratio--object z-1" />
              <figcaption class="absolute bottom-0 truncate w-100 h2" style="top:100%;">
              </figcaption>
            </figure>
          </div>
        </div>
        <div class="w-40-ns w-100-m w-100 flex flex-column pa3">
          <span class="w-100 mid-gray pb2">Featured</span>
          <div class="w-100 flex">
            ${state.cache(Track, 'track').render({
              style: 'blank',
              track: {
                id: state.track.id,
                title: state.track.title,
                duration: state.track.duration,
                status: 'paid',
                cover: state.release.cover
              },
              playlist: [
                {
                  count: 0,
                  fav: 0,
                  track: {
                    id: state.track.id,
                    title: state.track.title,
                    duration: state.track.duration,
                    status: 'paid',
                    cover: state.release.cover
                  },
                  src: `https://api.resonate.is/v1/stream/${state.track.id}`,
                  trackGroup: [state.release]
                }
              ],
              count: 0,
              fav: 0,
              src: `https://api.resonate.is/v1/stream/${state.track.id}`,
              trackGroup: [state.release]
            })}
          </div>
          <div class="flex flex-column pv2">
            <div class="flex pv2">
              <span class="w-40 near-black">Producers</span>
              <span class="w-60 mid-gray">${state.release.composers.map((composer) => composer)}</span>
            </div>
            <div class="flex pv2">
              <span class="w-40 near-black">Genres</span>
              <span class="w-60 mid-gray">${state.release.tags.map((tag) => tag)}</span>
            </div>
            <div class="flex pv2">
              <span class="w-40 near-black">Year</span>
              <span class="w-60 mid-gray">${new Date(state.release.release_date).getFullYear()}</span>
            </div>
          </div>
        </div>
      </section>
    `
  })

  console.log('mounting player')
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

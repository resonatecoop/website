import onIntersect from 'on-intersect'
import animation from 'nanoanimation'

document.addEventListener('DOMContentLoaded', DOMContentLoaded)

function DOMContentLoaded () {
  nav()
  tabbing()
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

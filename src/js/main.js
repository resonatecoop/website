import onIntersect from 'on-intersect'
import inViewPort from './in-viewport'

document.addEventListener('DOMContentLoaded', (event) => {
  nav()
})

function nav () {
  const nav = document.querySelector('nav')
  const header = document.querySelector('header')

  if (!inViewPort(header)) {
    nav.style.backgroundColor = '#000'
  }

  onIntersect(header, { rootMargin: '-87px' }, () => {
    nav.style.backgroundColor = 'transparent'
  }, () => {
    nav.style.backgroundColor = '#000'
  })
}

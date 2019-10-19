import onIntersect from 'on-intersect'
import inViewPort from './in-viewport'

import './desamber'

document.addEventListener('DOMContentLoaded', (event) => {
  desamber()
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

function desamber () {
  const dates = document.querySelectorAll('time')

  dates.forEach((elem, index) => {
    elem.innerHTML = new Date(elem.dateTime).desamber().toString()
  })
}

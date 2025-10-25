(() => {
  const collapses = Array.from(document.querySelectorAll('[data-collapse]'))
  const openedClass = 'opened'

  collapses.forEach(collapse => {
    collapse.addEventListener('click', () => {
      collapse.classList.toggle(openedClass)
    })
  })
})()

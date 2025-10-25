(() => {
  const tabs = Array.from(document.querySelectorAll('[data-tabs]'))
  const activeClass = 'active'

  tabs.forEach(tabs => {
    const links = tabs.querySelectorAll('[data-tabs-link]')
    const pages = tabs.querySelectorAll('[data-tabs-page]')

    links.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        
        links.forEach(link => link.classList.remove(activeClass))
        links[index].classList.add(activeClass)

        pages.forEach(page => page.classList.remove(activeClass))
        pages[index].classList.add(activeClass)
      })
    })
  })
})()

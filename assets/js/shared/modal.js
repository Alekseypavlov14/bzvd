(() => {
  const modals = Array.from(document.querySelectorAll('[data-modal]'))
  const togglers = Array.from(document.querySelectorAll('[data-modal-toggle]'))
  const openedClass = 'opened'
  const fixedClass = 'fixed'

  modals.forEach(modal => {
    const background = modal.querySelector('[data-modal-background]')
    const content = modal.querySelector('[data-modal-content]')

    if (!background || !content) return

    modal.addEventListener('click', (e) => e.stopPropagation())
    background.addEventListener('click', () => {
      modal.classList.remove(openedClass)
      document.body.classList.remove(fixedClass)
    })
    content.addEventListener('click', (e) => e.stopPropagation())
  })

  togglers.forEach(toggler => {
    toggler.addEventListener('click', (e) => {
      e.preventDefault()

      const modalId = toggler.getAttribute('data-modal-toggle')
      const modal = document.getElementById(modalId)
      if (!modal) return

      modal.classList.add(openedClass)
      document.body.classList.add(fixedClass)
    })
  })
})()

(() => {
  const cookies = document.getElementById('cookies')
  const button = document.getElementById('cookies-button')
  const close = document.getElementById('cookies-close')
  const hiddenClass = 'hidden'

  button.addEventListener('click', (e) => {
    e.preventDefault()

    cookies.classList.add(hiddenClass)
  })

  close.addEventListener('click', (e) => {
    e.preventDefault()

    cookies.classList.add(hiddenClass)
  })
})()

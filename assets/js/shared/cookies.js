(() => {
  const COOKIES_LOCAL_STORAGE_KEY = 'cookies'
  const COOKIES_ACCEPTED = 'accepted'
  const COOKIES_REJECTED = 'rejected'

  const cookies = document.getElementById('cookies')
  const button = document.getElementById('cookies-button')
  const close = document.getElementById('cookies-close')
  const hiddenClass = 'hidden'

  // show cookies modal if no decision
  if (!getCookiesState()) cookies.classList.remove(hiddenClass)

  // accepted case 
  button.addEventListener('click', (e) => {
    e.preventDefault()

    cookies.classList.add(hiddenClass)
  
    setCookiesState(COOKIES_ACCEPTED)
  })
  // rejected case
  close.addEventListener('click', (e) => {
    e.preventDefault()

    cookies.classList.add(hiddenClass)
  
    setCookiesState(COOKIES_REJECTED)
  })

  function getCookiesState() {
    return localStorage.getItem(COOKIES_LOCAL_STORAGE_KEY) === COOKIES_ACCEPTED
  }
  function setCookiesState(state) {
    localStorage.setItem(COOKIES_LOCAL_STORAGE_KEY, state)
  }
})()

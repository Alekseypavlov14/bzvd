(() => {
  const TARIFFS = {
    optimal: {
      name: "Optimal",
      price: 300,
    },
    vip: {
      name: "VIP",
      price: 370
    }
  }

  // buttons that open modals
  const buyTicketsModalButtons = Array.from(document.querySelectorAll('[data-buy-tickets-button]'))

  buyTicketsModalButtons.forEach(button => {
    // get targeting modal
    const targetModalId = button.getAttribute('data-modal-toggle')
    const targetModal = document.getElementById(targetModalId)
    if (!targetModal) return

    // get target form
    const form = targetModal.querySelector('form')
    if (!form) return
    
    // get desired tariff
    const tariffKey = button.getAttribute('data-buy-tickets-button')
    const tariff = TARIFFS[tariffKey]
    if (!tariff) return
    
    button.addEventListener('click', () => {
      // get button
      const formSubmitButton = form.querySelector('button')
      if (!formSubmitButton) return

      // update submit button
      formSubmitButton.outerHTML = getSubmitButtonHTML(tariff)
    })
  })

  // template utils
  function getSubmitButtonHTML(tariff) {
    return `
      <button class="buy-tickets-modal-button">
        <div class="buy-tickets-modal-button__text">Купить билет ${tariff.name}</div>
        <div class="buy-tickets-modal-button__price">${tariff.price} BYN</div>
      </button>
    `
  }

  // upload fields
  const uploads = Array.from(document.querySelectorAll('[data-upload]'))

  uploads.forEach(upload => {
    const label = upload.querySelector('[data-upload-label]')
    const control = upload.querySelector('[data-upload-control]')

    control.addEventListener('change', (e) => {
      const filename = e.target.files[0]?.name
      if (!filename) return

      label.innerHTML = filename
    })
  })
})()
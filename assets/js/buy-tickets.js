(() => {
  const DEFAULT_TARIFF = 'optimal'
  const DEFAULT_CLIENT = 'person'

  // configuration
  const configuration = getConfiguration()
  if (!configuration) return

  // controls
  const buyTicketsForm = document.getElementById('buy-tickets-modal-form')
  const buyTicketsModalButtons = Array.from(document.querySelectorAll('[data-buy-tickets-button]'))

  // add button event listeners
  buyTicketsModalButtons.forEach(button => {
    // get config key values
    const tariffKey = button.getAttribute('data-buy-tickets-tariff') ?? DEFAULT_TARIFF
    const clientKey = button.getAttribute('data-buy-tickets-client') ?? DEFAULT_CLIENT

    // get config data by keys
    const tariff = configuration.tariffs[tariffKey]
    const client = configuration.clients[clientKey]

    // render form
    button.addEventListener('click', () => {
      renderForm({ tariff, client })
    })
  })

  // renderers 
  function renderForm({ tariff, client }) {
    const templates = client.map(renderField)
    const button = renderButton(tariff)

    const template = [...templates, button].join('')
    buyTicketsForm.innerHTML = template
  }
  
  function renderField(field, index) {
    if (field.control === 'input') return renderInputField(field, index)
    if (field.control === 'select') return renderSelectField(field, index)

    return renderInputField(field, index)
  }

  function renderSelectField(field, index) {
    const options = field.options.map(renderSelectOption)
    const optionsTemplate = options.join('')

    return `
      <div class="buy-tickets-modal__field">
        <label class="buy-tickets-modal__label">
          ${index + 1}. ${field.label} ${renderRequired(field.isRequired)}
        </label>

        <div class="buy-tickets-modal__control select">
          <div data-select-control class="select__control">
            <div data-select-label class="select__label"></div>
            <input data-select-value hidden>

            <div class="select__arrow">
              <img src="./assets/img/select-arrow.svg">
            </div>
          </div>

          <div class="select__dropdown">
            ${optionsTemplate}
          </div>
        </div>

        ${renderHint(field.hint)}
      </div>
    `
  }

  function renderSelectOption(option) {
    return `
      <div 
        data-select-option="${option.value}"
        class="select__option"
      >
        ${option.label}          
      </div>
    `
  }
  
  function renderInputField(field, index) {
    return `
      <div class="buy-tickets-modal__field">
        <label class="buy-tickets-modal__label">
          ${index + 1}. ${field.label} ${renderRequired(field.isRequired)}
        </label>

        <input 
          class="buy-tickets-modal__control" 
          placeholder="${field.placeholder}"
          type="${field.type}"
        >

        ${renderHint(field.hint)}
      </div>
    `
  }

  function renderHint(hint) {
    if (!hint) return ''

    return `<div class="buy-tickets-modal__hint">${hint}</div>`
  }
  
  function renderRequired(isRequired) {
    if (!isRequired) return ''

    return `<span class="required">*</span>`
  }

  function renderButton(tariff) {
    return `
      <button class="buy-tickets-modal-button">
        <div class="buy-tickets-modal-button__text">Купить билет ${tariff.name}</div>
        <div class="buy-tickets-modal-button__price">${tariff.price} BYN</div>
      </button>
    `
  }

  // utils
  function getConfiguration() {
    const element = document.getElementById('buy-tickets-data')
    if (!element) return null

    try {
      const content = JSON.parse(element.textContent.trim())
      return content
    }
    catch {
      return null
    }
  }
})()
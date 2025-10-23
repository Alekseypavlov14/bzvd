(() => {
  // initialize swiper
  new Swiper('#schedule-slider', {
    // defines pagination container
    pagination: {
      el: '.swiper-pagination',
    },

    // additional settings
    slidesPerView: 'auto',
    // specifies gap
    spaceBetween: 4,
    // allow grabbing
    grabCursor: true,
    // circular scrolling
    loop: true,
  })
})()

const MILLISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24

initializeTimer()

function initializeTimer() {
  // get all timer instances
  const timers = Array.from(document.querySelectorAll('[data-timer]'))

  timers.forEach(timer => {
    // get moment when event happens
    const moment = new Date(timer.getAttribute('data-timer-moment') ?? new Date().toISOString()).getTime()
    
    // get digits containers
    const days1 = timer.querySelector('[data-timer-days-1]')
    const days2 = timer.querySelector('[data-timer-days-2]')
    const hours1 = timer.querySelector('[data-timer-hours-1]')
    const hours2 = timer.querySelector('[data-timer-hours-2]')
    const minutes1 = timer.querySelector('[data-timer-minutes-1]')
    const minutes2 = timer.querySelector('[data-timer-minutes-2]')
    const seconds1 = timer.querySelector('[data-timer-seconds-1]')
    const seconds2 = timer.querySelector('[data-timer-seconds-2]')

    if (!days1 || !days2 || !hours1 || !hours2 || !minutes1 || !minutes2 || !seconds1 || !seconds2) return

    let counter = initializeInterval()
    
    window.addEventListener('focus', () => {
      resetInterval()
      counter = initializeInterval()
    })

    window.addEventListener('blur', resetInterval)

    function initializeInterval() {
      return setInterval(() => {
        if (!days1 || !days2 || !hours1 || !hours2 || !minutes1 || !minutes2 || !seconds1 || !seconds2) return
  
        const difference = updateTimerValues(moment)
        
        // get 2-digit values
        const days = formatNumber(difference.days)
        const hours = formatNumber(difference.hours)
        const minutes = formatNumber(difference.minutes)
        const seconds = formatNumber(difference.seconds)

        // write values
        days1.innerHTML = days[0]
        days2.innerHTML = days[1]
        hours1.innerHTML = hours[0]
        hours2.innerHTML = hours[1]
        minutes1.innerHTML = minutes[0]
        minutes2.innerHTML = minutes[1]
        seconds1.innerHTML = seconds[0]
        seconds2.innerHTML = seconds[1]
  
        // handle passed events
        if (difference.isPassed) handleEventPassed()
      }, MILLISECONDS_PER_SECOND)
    }

    function resetInterval() {
      clearInterval(counter)
    }

    function handleEventPassed() {}
  })
  
  function updateTimerValues(moment) {
    const now = Date.now()
    if (now > moment) return ({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPassed: true,
    })

    let difference = moment - now

    const daysDifference = Math.floor(difference / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY))
    difference %= MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY

    const hoursDifference = Math.floor(difference / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR))
    difference %= MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR

    const minutesDifference = Math.floor(difference / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE))
    difference %= MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE

    const secondsDifference = Math.floor(difference / MILLISECONDS_PER_SECOND)
    difference %= MILLISECONDS_PER_SECOND

    return ({
      days: daysDifference,
      hours: hoursDifference,
      minutes: minutesDifference,
      seconds: secondsDifference,
    })
  }

  function formatNumber(value) {
    return String(value).padStart(2, '0')
  }
}

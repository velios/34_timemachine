var TIMEOUT_IN_SECS = 3 * 60
var TIMEOUT_TO_NOTICE = 30
var TEMPLATE = '<h1><span class="js-timer-minutes">00</span>:<span class="js-timer-seconds">00</span></h1>'
var NOTICE_ARRAY = ['Баловством хлеба не добудешь', 'Без труда не выловишь рыбку из пруда', 'Всякая работа мастера хвалит', 'Деревья смотри в плодах, а людей смотри в делах', 'Есть терпенье, будет и уменье']

function padZero(number){
  return ("00" + String(number)).slice(-2);
}

function pickRandomNotice(noticeArray) {
  return noticeArray[Math.floor(Math.random() * noticeArray.length)]
}

class Timer{

  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  constructor(timeout_in_secs){
    this.initial_timeout_in_secs = timeout_in_secs
    this.reset()
  }
  getTimestampInSecs(){
    var timestampInMilliseconds = new Date().getTime()
    return Math.round(timestampInMilliseconds/1000)
  }
  start(){
    if (this.isRunning)
      return
    this.timestampOnStart = this.getTimestampInSecs()
    this.isRunning = true
  }
  stop(){
    if (!this.isRunning)
      return
    this.timeout_in_secs = this.calculateSecsLeft()
    this.timestampOnStart = null
    this.isRunning = false
  }
  reset(timeout_in_secs){
    this.isRunning = false
    this.timestampOnStart = null
    this.timeout_in_secs = this.initial_timeout_in_secs
  }
  calculateSecsLeft(){
    if (!this.isRunning)
      return this.timeout_in_secs
    var currentTimestamp = this.getTimestampInSecs()
    var secsGone = currentTimestamp - this.timestampOnStart
    return this.timeout_in_secs - secsGone
  }
}

class TimerWidget{
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  construct(){
    this.timerContainer = this.minutes_element = this.seconds_element = null
  }
  mount(rootTag){
    if (this.timerContainer)
      this.unmount()

    // adds HTML tag to current page
    this.timerContainer = document.createElement('div')

    this.timerContainer.classList.add('timer-div')
    this.timerContainer.setAttribute("style", "padding: 5px;border: 2px solid #4d7284;border-radius: 5rem;position: fixed;color: #f5f5f5;top: 10px;right: 10px;z-index: 1000;background: rgba(143, 179, 205, 0.82);font-size: 1.5rem;")
    this.timerContainer.innerHTML = TEMPLATE

    rootTag.insertBefore(this.timerContainer, rootTag.firstChild)

    this.minutes_element = this.timerContainer.getElementsByClassName('js-timer-minutes')[0]
    this.seconds_element = this.timerContainer.getElementsByClassName('js-timer-seconds')[0]
  }
  update(secsLeft){
    var minutes = Math.floor(secsLeft / 60);
    var seconds = secsLeft - minutes * 60;

    this.minutes_element.innerHTML = padZero(minutes)
    this.seconds_element.innerHTML = padZero(seconds)
  }
  unmount(){
    if (!this.timerContainer)
      return
    this.timerContainer.remove()
    this.timerContainer = this.minutes_element = this.seconds_element = null
  }
}


function main(){

  var timer = new Timer(TIMEOUT_IN_SECS)
  var timerWiget = new TimerWidget()
  var intervalId = null

  timerWiget.mount(document.body)

  function handleIntervalTick(){
    var secsLeft = timer.calculateSecsLeft()
    var showSecs = getShowSecs(secsLeft)
    if (secsLeft <= 0)
      timerDiv.style.background = "red"

    if (isNoticeShow(secsLeft))
      alert(pickRandomNotice(NOTICE_ARRAY))
    timerWiget.update(showSecs)
  }

  function getShowSecs(secsLeft) {
    if (secsLeft <= 0)
      return 0
    return secsLeft
  }

  function isNoticeShow(secsLeft) {
    if (secsLeft >= 0)
      return false
    return !(secsLeft % TIMEOUT_TO_NOTICE)
  }

  function handleVisibilityChange(){
    if (document.hidden) {
      timer.stop()
      clearInterval(intervalId)
      intervalId = null
    } else {
      timer.start()
      intervalId = intervalId || setInterval(handleIntervalTick, 300)
    }
  }


  // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
    handleVisibilityChange()

  var timerDiv = document.querySelector('.timer-div')
  timerDiv.addEventListener('click', function () {
    timerDiv.style.background = "rgba(143, 179, 205, 0.82)"
    timer.reset()
    timer.start()
  })
}



// initialize timer when page ready for presentation
window.addEventListener('load', main)

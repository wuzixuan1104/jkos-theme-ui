import '../css/style.css'

window.onload = function() {
  // 跑馬燈
  const el = document.getElementById('ticker');
  const component = el.innerHTML;
  const trackerWidth = 500; // 一組 500px
  const num = Math.ceil(window.screen.width / trackerWidth);

  let tickerHtml = ''
  for (let i = 0; i <= num; i ++)
    tickerHtml += component

  el.innerHTML = tickerHtml;

  
  // 訊息泡泡
  const options = {
    root: null,
    rootMargin: '0px 0px 50px 0px',
    threshold:  [0.9, 1.0]
  }
  
  let intersectionRatio = undefined;

  const callback = (entries) => {
    entries.forEach(entry => {
      const currentRatio = intersectionRatio;
      const newRatio = entry.intersectionRatio;
      const boundingClientRect = entry.boundingClientRect;
      const scrollingDown = currentRatio !== undefined && newRatio < currentRatio && boundingClientRect.bottom < boundingClientRect.height;
      const messageEl = entry.target.querySelector('.message');
      const typingEl = messageEl.querySelector('.typing');

      intersectionRatio = newRatio;

      if (!entry.isIntersecting) {
        if (!scrollingDown) {
          messageEl.classList.remove('open');
          setTimeout(() => {
            typingEl.classList.remove('on')
          }, 500)
        }
     
        return;
      }
      
      messageEl.classList.add('open');
      typingEl.classList.add('on');
    })
  }

  const message = document.querySelectorAll('.message-wrapper')

  let observer = new IntersectionObserver(callback, options);
  message.forEach((target) => {
    observer.observe(target)
  })

  // 進度條
  pregressbarChange()
}

const progressTime = 0; // 300
const bodyShowDelay = 0; // 2000

function pregressbarChange() {
  setTimeout(function() {
    const size = 1;
    const progress = document.getElementById('progress');
    progress.style.setProperty('--size', size);

    setTimeout(function() {
      const loader = document.getElementById('loader-layout');
      const content = document.getElementById('body-content');
      content.style.display = 'block'
      loader.style.display = 'none'
    }, bodyShowDelay)
  }, progressTime)
}
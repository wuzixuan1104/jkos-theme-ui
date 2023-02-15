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

      intersectionRatio = newRatio;

      if (!entry.isIntersecting) {
        if (!scrollingDown)
          entry.target.querySelector('.message').classList.remove('open');
        return;
      }

      
      entry.target.querySelector('.message').classList.add('open');
    })
  }

  const message = document.querySelectorAll('.message-wrapper')

  let observer = new IntersectionObserver(callback, options);
  message.forEach((target) => {
    observer.observe(target)
  })
}
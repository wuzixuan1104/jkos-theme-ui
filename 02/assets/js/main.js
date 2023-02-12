import '../css/style.css'

window.onload = function() {
  // 跑馬燈
  const el = document.getElementById('ticker');
  let tickerHtml = ''
  const component = el.innerHTML;
  for (let i = 0; i < 10; i ++) {
    tickerHtml += component
  }
  el.innerHTML = tickerHtml;

  // 訊息泡泡
  const options = {
    rootMargin: '0px 0px 50px 0px',
    threshold: 0
  }
  const message = document.querySelectorAll('.message-wrapper')
  
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      console.log(entry);
      
      if (!entry.isIntersecting) return
      entry.target.querySelector('.message').classList.add('open');
      observer.unobserve(entry.target)
    })
  }

  let observer = new IntersectionObserver(callback, options);
  message.forEach((target) => {
    observer.observe(target)
  })
}
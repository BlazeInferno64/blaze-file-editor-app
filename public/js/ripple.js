const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('click', function (e) {
    let x = e.clientX - e.target.offsetLeft
    let y = e.clientY - e.target.offsetTop
    
    let ripples = document.createElement('span')
    ripples.style.left = x + 'px'
    ripples.style.top = y + 'px'
    this.appendChild(ripples)
    
    window.setTimeout(() => {
      ripples.remove()
    }, 800)
  });
  btn.addEventListener('auxclick', function (e) {
    let x = e.clientX - e.target.offsetLeft
    let y = e.clientY - e.target.offsetTop
    
    let ripples = document.createElement('span')
    ripples.style.left = x + 'px'
    ripples.style.top = y + 'px'
    this.appendChild(ripples)
    
    window.setTimeout(() => {
      ripples.remove()
    }, 800)
  });
  btn.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    let x = e.clientX - e.target.offsetLeft
    let y = e.clientY - e.target.offsetTop
    
    let ripples = document.createElement('span')
    ripples.style.left = x + 'px'
    ripples.style.top = y + 'px'
    this.appendChild(ripples)
    
    window.setTimeout(() => {
      ripples.remove()
    }, 800)
  });
})

closeButton.forEach(btn => {
    btn.addEventListener('click', function (e) {
      let x = e.clientX - e.target.offsetLeft
      let y = e.clientY - e.target.offsetTop
      
      let ripples = document.createElement('span')
      ripples.style.left = x + 'px'
      ripples.style.top = y + 'px'
      this.appendChild(ripples)
      
      window.setTimeout(() => {
        ripples.remove()
      }, 800)
    });
    btn.addEventListener('auxclick', function (e) {
      let x = e.clientX - e.target.offsetLeft
      let y = e.clientY - e.target.offsetTop
      
      let ripples = document.createElement('span')
      ripples.style.left = x + 'px'
      ripples.style.top = y + 'px'
      this.appendChild(ripples)
      
      window.setTimeout(() => {
        ripples.remove()
      }, 800)
    });
    btn.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      let x = e.clientX - e.target.offsetLeft
      let y = e.clientY - e.target.offsetTop
      
      let ripples = document.createElement('span')
      ripples.style.left = x + 'px'
      ripples.style.top = y + 'px'
      this.appendChild(ripples)
      
      window.setTimeout(() => {
        ripples.remove()
      }, 800)
    });
  })
const e = e => document.getElementById(e)
const q = q => document.querySelector(q)

const mobileDisplay = q('.mobile__display')
const previousBtn = e('previousBtn')
const nextBtn = e('nextBtn')
const closeBtn = e('closeBtn')
const mobileMenuContainer = q('.mobile__menu__container')
const bg = q('.bg')
const menuBtn = e('menuBtn')
const increment = e('increment')
const decrement = e('decrement')
const count = e('count')
const desktopDisplay = q('.desktop__display')
const basketDisplay = q('.basket__display')
const emptyCartP = q('.empty__cart__p')
const basketItems = q('.basket__items')
const addToCartBtn = e('addToCart__button')
const cartBtn = e('cart')
const basket = q('.basket')
const productName = q('.description > h1')
const price = e('price')
const cartCount = e('cart__count')

const lightbox = q('.lightbox')
const lightboxClose = e('lightbox__close')
const lightboxDisplay = q('.lightbox__display')
const lightboxPreviousBtn = e('lightbox__previousBtn')
const lightboxNextBtn = e('lightbox__nextBtn')

const thumbnails = document.querySelectorAll('.thumbnail__container > div')
const lightboxThumbnails = document.querySelectorAll('.lightbox__thumbnail > div')

let currentImage = 1
let lightboxCurrentImage = 1
let cart = []

const updateCartDisplay = () => {
  while(basketItems.firstChild) {
    basketItems.removeChild(basketItems.firstChild)
  }

  if(cart.length <= 0) {
    basketDisplay.style.display = 'none'
    emptyCartP.style.display = 'block'
    cartCount.textContent = ''
    return
  } 
  
  cartCount.textContent = cart.length
  basketDisplay.style.display = 'flex'
  emptyCartP.style.display = 'none'

  cart.forEach(x => {
    const container = document.createElement('div')
    const img1 = document.createElement('img')
    const div = document.createElement('div')
    const p1 = document.createElement('p')
    const span = document.createElement('span')
    const span2 = document.createElement('span')
    const img2 = document.createElement('img')

    img1.setAttribute('src', x.image)
    p1.textContent = x.product
    span.textContent = `$${x.price} x ${x.count} `
    span2.textContent = `$${x.totalPrice}`
    img2.setAttribute('src', './images/icon-delete.svg')

    div.append(p1, span, span2)
    container.append(img1, div, img2)
    basketItems.appendChild(container)

    img2.addEventListener('click', () => {
      cart = cart.filter(y => y._id != x._id)
      updateCartDisplay()
    })

  })

}
updateCartDisplay()

const updateMobileDisplay = () => {
  mobileDisplay.style.backgroundImage = `url('./images/image-product-${currentImage}.jpg')`
}
const updateDesktopDisplay = () => {
  desktopDisplay.style.backgroundImage = `url('./images/image-product-${currentImage}.jpg')`
}
const updateLightboxDisplay = () => {
  lightboxDisplay.style.backgroundImage = `url('./images/image-product-${lightboxCurrentImage}.jpg')`
}

updateMobileDisplay()
updateDesktopDisplay()


previousBtn.addEventListener('click', () => {
  currentImage--
  currentImage < 1? currentImage = 4: null
  updateMobileDisplay()
})
nextBtn.addEventListener('click', () => {
  currentImage++
  currentImage > 4? currentImage = 1: null
  updateMobileDisplay()
})

const btn = [closeBtn, bg, menuBtn]
btn.forEach(x => {
  x.addEventListener('click', ()=> {
    mobileMenuContainer.classList.toggle('active')
  })
})

cartBtn.addEventListener('click', () => {
  basket.classList.toggle('active')
})

increment.addEventListener('click', () => {
  count.textContent++
})
decrement.addEventListener('click', () => {
  count.textContent > 1 && count.textContent--
})

addToCartBtn.addEventListener('click', () => {
  const generateId = () => {
    return Math.floor(Math.random()*1e16)
  }
  const totalPrice = () => {
    const a = parseInt(price.textContent.split('$')[1])
    const b = parseInt(count.textContent)
    return (a*b).toFixed(2)
  }
  cart.push({
    _id: generateId(),
    product: productName.textContent,
    image: '/images/image-product-1-thumbnail.jpg',
    price: price.textContent.split('$')[1],
    count: count.textContent,
    totalPrice: totalPrice()
  })
  count.textContent = 1
  updateCartDisplay()
})

for(let i = 0; i < 4; i++) {
  thumbnails[i].pos = i+1
}
for(let i = 0; i < 4; i++) {
  lightboxThumbnails[i].pos = i+1
}

thumbnails.forEach(x => {
  x.addEventListener('click', () => {
    thumbnails.forEach(y => {
      y.classList.remove('active')
    })
    x.classList.add('active')
    currentImage = x.pos
    updateDesktopDisplay()
  })
})

lightboxThumbnails.forEach(x => {
  x.addEventListener('click', () => {
    lightboxCurrentImage = x.pos
    setLightBoxActive(x.pos)
    updateLightboxDisplay()
  })
})

const setLightBoxActive = e => {
  lightboxThumbnails.forEach(x => {
    x.classList.remove('active')
  })
  lightboxThumbnails[e-1].classList.add('active')
}

desktopDisplay.addEventListener('click', () => {
  lightbox.classList.toggle('active')
  lightboxCurrentImage = currentImage
  setLightBoxActive(lightboxCurrentImage)
  updateLightboxDisplay()
})

lightboxClose.addEventListener('click', () => {
  lightbox.classList.toggle('active')
})
lightboxPreviousBtn.addEventListener('click', () => {
  lightboxCurrentImage--
  lightboxCurrentImage < 1? lightboxCurrentImage = 4: null
  setLightBoxActive(lightboxCurrentImage)
  updateLightboxDisplay()
})
lightboxNextBtn.addEventListener('click', () => {
  lightboxCurrentImage++
  lightboxCurrentImage > 4? lightboxCurrentImage = 1: null
  setLightBoxActive(lightboxCurrentImage)
  updateLightboxDisplay()
})




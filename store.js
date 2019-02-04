if (document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready(){
  var removeCartItemButtons = document.getElementsByClassName('btn-remove')
  console.log(removeCartItemButtons)
  for (var i = 0; i < removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeItem)
  }

  var quantityInputs = document.getElementsByClassName('quantity-input')
  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }

  var addCartButtons = document.getElementsByClassName('btn-add')
  for (var i = 0; i < addCartButtons.length; i++){
    var button = addCartButtons[i]
    button.addEventListener('click', addedToCart)
  }

  function addedToCart(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-name')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
  }

  function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    cartItemNames = cartItems.getElementsByClassName('cart-item-name')
    for (var i = 0; i < cartItemNames.length; i++){
      if (cartItemNames[i].innerText == title){
        // TO-DO: Make it update total from quantity input
        var quantityField = cartItems.getElementsByClassName('quantity-input')
        var amount = quantityField[i].value
        quantityField[i].value = parseInt(quantityField[i].value) + 1
        return
      }
    }
    var cartRowContents = `
      <div class="cart-item cart-column">
        <img class="cart-image" src ="${imageSrc}" width="100">
        <span class="cart-item-name">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
        <input class="quantity-input" type="number" value="1" />
        <button class="btn btn-primary btn-remove">REMOVE</button>
      </div>`
      cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeItem)
    cartRow.getElementsByClassName('quantity-input')[0].addEventListener('change', quantityChanged)
  }

  function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
      input.value = 1
    }
    updateCartTotal()
  }

  function removeItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
  }

  function updateCartTotal(){
    cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++){
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('quantity-input')[0]

      var price = parseFloat(priceElement.innerText.replace('£', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
    }
    total = Math.round(total*100) / 100
    document.getElementsByClassName('total-price')[0].innerText = '£' + total
  }
}

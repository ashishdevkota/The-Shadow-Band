if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}


function ready(){
// remove button 
var removeCartItemButtons=document.getElementsByClassName('btn-danger');
for(var i=0;i<removeCartItemButtons.length;i++){
    var button=removeCartItemButtons[i]
    button.addEventListener('click',removeCartItem)
    }
    // update input item and check negative items
    var quantityInputs=document.getElementsByClassName('cart-quantity-input')
    for(var i=0;i<quantityInputs.length;i++){
        var input=quantityInputs[i]
        input.addEventListener('change',quantityChange)
    }
    var addToCartButtons=document.getElementsByClassName('shop-item-btn')
    for(var i=0;i<addToCartButtons.length;i++){
        var button=addToCartButtons[i]
        button.addEventListener('click',addToCartClicked)
    }

    // purchase btn 
 document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}

// purchase click function 
function purchaseClicked(){
alert('Thank you for your purchase')
var cartItems=document.getElementsByClassName('cart-items')[0]
while(cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
}
updateCartTotal()
}

//  remove cart function
function removeCartItem(event){
    var buttonClicked=event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
//quantity change 
function quantityChange(event){
 var input=event.target
 if(isNaN(input.value) || input.value<=0){
     input.value=1
 }
updateCartTotal()
}

//add to cart click 
function addToCartClicked(event){
 var button=event.target
 var shopItem=button.parentElement.parentElement
 var title=shopItem.getElementsByClassName('shop-item-title')[0].innerText
 var price=shopItem.getElementsByClassName('shop-item-price')[0].innerText
 var imageSrc=shopItem.getElementsByClassName('shop-item-image')[0].src
 addItemToCart(title,price,imageSrc)
 updateCartTotal()
}

// add row to cart 
 function addItemToCart(title,price,imageSrc){
     var cartRow=document.createElement('div')
     cartRow.classList.add('cart-row')
     var cartItems=document.getElementsByClassName('cart-items')[0]
     //to check repetito on item on cart 
     var cartItemsNames=cartItems.getElementsByClassName('cart-item-title')
  for(var i=0;i<cartItemsNames.length;i++){
      if(cartItemsNames[i].innerText == title){
          alert('This item is already added to the cart')
          return
      }
  }
    var cartRowContents=`
        <div class="cart-item cart-column">
            <img src="${imageSrc}" alt="" class="cart-item-image">
            <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
            <input type="number" value="1" class="cart-quantity-input">
            <button  class="btn btn-danger" role="button">REMOVE</button>
        </div>`
        cartRow.innerHTML=cartRowContents
     cartItems.appendChild(cartRow)
    //  use remove btn to newly added item 
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChange)
 }

    // update cart 
    function updateCartTotal(){
var cartItemContainer=document.getElementsByClassName('cart-items')[0]
 var cartRows=cartItemContainer.getElementsByClassName('cart-row')
 var total=0
 for(var i=0;i<cartRows.length;i++){
     var cartRow=cartRows[i]
     var priceElement=cartRow.getElementsByClassName('cart-price')[0]
     var quantityElement=cartRow.getElementsByClassName('cart-quantity-input')[0]
     var price=parseFloat(priceElement.innerText.replace('$',''))
     var quantity=quantityElement.value
     total=total+(price * quantity)
  }
  total=Math.round(total * 100)/100
  document.getElementsByClassName('cart-total-price')[0].innerText='$'+total
    }
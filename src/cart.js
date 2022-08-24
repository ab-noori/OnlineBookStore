let label = document.getElementById("label");

let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("ali")) || [];
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket.map((cart) => {
      let {id, item} = cart;
      let search = shopItemsData.find((y)=> y.id === id) || [];
      let {img, name, price} = search;
      return `
            <div class="cart-item">
              <img width="95" src=${img} alt="">
              <div class="cart-details">
                <div class="title-price-x">
                    <h4 class="title-price">
                      <p>${name}</p>
                      <p class="cart-item-price" >$ ${price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                </div>
                <div class="buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${item}</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
      
                </div>
                <h3>$ ${item*price}</h3> 
              </div>
            </div>

            
        `;
    }).join(""));
  } else {
    shoppingCart.innerHTML = ``;

    label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="homeBtn">Back to home</button>
            
        </a>
        `;
  }
};


generateCartItems();


let increment = (id)=>{
  let selectedItem = id;
  let search = basket.find((x)=>x.id===selectedItem.id);
  if(search === undefined){
      basket.push({
          id: selectedItem.id,
          item: 1,
      })
  }else{
      search.item +=1;
  }
    
  generateCartItems();
  update(selectedItem.id);

  
  localStorage.setItem("ali", JSON.stringify(basket));
}

let decrement = (id)=>{
  let selectedItem = id;
  let search = basket.find((x)=>x.id===selectedItem.id);

  if(search === undefined)return
  else if(search.item === 0)return
  else{
      search.item -=1;
  }

  update(selectedItem.id);
  basket = basket.filter((f) => f.item !== 0);
  generateCartItems();
  localStorage.setItem("ali", JSON.stringify(basket));
  }

let update = (id) =>{
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totallAmount();
}

let removeItem = (id) =>{
  let selectedItem = id;
  basket = basket.filter((toremove)=> toremove.id !== selectedItem.id);
  localStorage.setItem("ali", JSON.stringify(basket));
  generateCartItems();
  totallAmount();
  calculation();

}

let clearCarts = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("ali", JSON.stringify(basket));
  calculation();
  

}

let totallAmount = () => {
  if(basket.length !== 0){
    let amount = basket.map((p)=>{
      let {item, id} = p;
      let search = shopItemsData.find((y)=> y.id === id) || [];

      return item * search.price;
    }).reduce((x,y)=>x+y,0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill: $ ${amount}</h2>
    <button class="a">Checkout</button>
    <button onclick="clearCarts()" class="b">Clear All</button>
    
    `;
  }
  else return
};

totallAmount();
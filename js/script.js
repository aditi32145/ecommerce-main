var cart = document.querySelector('.cart');

function open_cart() {
  cart.classList.add("active")
}

function close_cart() {
  cart.classList.remove("active")
}

const products = [
  { name: "Chocolate", img1: "chocolate-1.jpg", img2: "chocolate-2.jpg", price: 220, oldPrice: 240, discount: 15 },
  { name: "Teddy", img1: "teddy-1.jpg", img2: "teddy-3.jpg", price: 350, oldPrice: 400, discount: 12 },
  { name: "Purse", img1: "purse-1.jpg", img2: "purse-3.jpg", price: 499, oldPrice: 599, discount: 17 },
  { name: "Perfume", img1: "perfume-1.jpg", img2: "perfume-3.jpg", price: 499, oldPrice: 599, discount: 17 },
  { name: "Piece", img1: "piece-1.jpg", img2: "piece-3.jpg", price: 499, oldPrice: 599, discount: 19 },
  { name: "Watch", img1: "watch-1.jpg", img2: "purse-3.jpg", price: 499, oldPrice: 599, discount: 17 }
]

const container = document.getElementById('productContainer');
products.forEach(product => {
  container.innerHTML += `
    <div class="product"

    data-name = "${product.name}"
    data-img1 = "images/${product.img1}"
    data-img2 = "images/${product.img2}"
    data-price = "${product.price}"    
    data-old-price = "${product.oldPrice}"
    data-discount = "${product.discount}"
    >

            <div class="icons">
              <i class="fa-solid fa-cart-shopping"></i>
              <i class="fa-solid fa-heart"></i>
              <i class="fa-solid fa-share"></i>
            </div>
            <span class="sale_present">%${product.discount}</span>
            <div class="img_product">
              <img src="images/${product.img1}" alt="">
              <img class="img_hover" src="images/${product.img2}" alt="">
            </div>
            <h3 class="product_name"><a href="#">${product.name}</a></h3>
            <div class="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <div class="price">
              <p><span>₹${product.price}</span></p>
              <p class="old_price">₹${product.oldPrice}</p>
            </div>
          </div>`;
});


let cartData = JSON.parse(localStorage.getItem("cartData") || []);
renderCart();

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-cart-shopping")) {
    const productElem = e.target.closest(".product");
    const name = productElem.querySelector(".product_name a").innerText;
    const price = parseInt(productElem.querySelector(".price span").innerText.replace("₹", ""));
    const img = productElem.querySelector(".img_product img").getAttribute("src");

    const existing = cartData.find(item => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cartData.push({ name, price, img, qty: 1 });
    }
    renderCart();
  }
});

// Render cart
function renderCart() {
  const container = document.querySelector(".cart_items");

  container.innerHTML = "";

  let total = 0;
  let count = 0;

  cartData.forEach((item, i) => {
    const itemTotal = item.price * item.qty;

    total += itemTotal;
    count += item.qty;

    container.innerHTML += `
    <div class="item_cart">
    <img src="${item.img}" alt="">

    <div class ="content">
    <h4>${item.name}</h4>
    <div class="qty_control">
    <button class="qty_button minus" data-index="${i}">-</button>
    <span class="qty">${item.qty}</span>
    <button class="qty_button plus" data-index="${i}">+</button>
    </div>
    <p class="price_cart">₹${itemTotal}</p>
    </div>
        <button class="delete_item" data-index="${i}"><i class="fa-solid fa-trash"></i></button>
    `;
  });

  document.querySelector(".total_cart_price").innerText = `₹${total}`;
  document.querySelector(".cart_head_price").innerText = `₹${total}`;
  document.querySelector(".top_cart span").innerText = `(${count} Items${count > 1 ? "s" : ""} in cart)`;
  document.querySelector(".item_count").innerText = count;

  localStorage.setItem("cartData", JSON.stringify(cartData));

  setupCartActions();
}

function setupCartActions() {
  document.querySelectorAll(".qty_button.plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      cartData[index].qty += 1;
      renderCart();
    });
  });

  document.querySelectorAll(".qty_button.minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      if (cartData[index].qty > 1) {
        cartData[index].qty -= 1;
      } else {
        cartData.splice(index, 1);
      }
      renderCart();
    });
  });

  document.querySelectorAll(".delete_item").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      cartData.splice(index, 1);
      renderCart();
    });
  });
}

document.querySelector(".go_to_top").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" })
});


document.querySelectorAll('.product').forEach(productDiv => {
  productDiv.addEventListener('click', function (e) {
    if (e.target.classList.contains("fa-cart-shopping")) return;
    const product = {
      name: this.dataset.name,
      img1: this.dataset.img1,
      img2: this.dataset.img2,
      price: this.dataset.price,
      oldPrice: this.dataset.oldPrice,
      discount: this.dataset.discount
    };

    localStorage.setItem("selectedProduct", JSON.stringify(product));

    window.location.href = "item.html";
  });
});

const product = JSON.parse(localStorage.getItem("selectedProduct"));

if(product){
  document.querySelector(".img_item .big_img img").src = product.img1;

  const smallImages = document.querySelectorAll(".img_item .sm_img img");

  if (smallImages.length >= 3){
    smallImages[0].src = product.img2;
    smallImages[1].src = product.img1;
    smallImages[2].src = product.img2;
  }

   document.querySelector(".item_detail .name").innerText = product.name;
   document.querySelector(".item_detail .price span").innerText = `₹${product.price}`;
   document.querySelector(".item_detail .price .old_price").innerText = `₹${product.oldPrice}`;

}
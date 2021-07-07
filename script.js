const products = [
  {
    id: "1",
    img: "https://images.unsplash.com/photo-1571689936114-b16146c9570a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=939&q=80",
    name: "produc 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, explicabo!",
    like: true,
    maxQt: 3,
    price: 300,
  },

  {
    id: "2",
    img: "https://images.unsplash.com/photo-1610395219791-21b0353e43cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    name: "produc 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, explicabo!",
    like: false,
    maxQt: 10,
    price: 400,
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1597248881519-db089d3744a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    name: "produc 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, explicabo!",
    like: false,
    maxQt: 14,
    price: 200,
  },

  {
    id: "4",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    name: "produc 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, explicabo!",
    like: true,
    maxQt: 13,
    price: 100,
  },
  {
    id: "5",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=989&q=80",
    name: "produc 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, explicabo!",
    like: false,
    maxQt: 27,
    price: 170,
  },
  {
    id: "6",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    name: "produc 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, explicabo!",
    like: false,
    maxQt: 5,
    price: 888,
  },
];

const shopingProducts = [];

const productsListEl = document.querySelector(".products__list");
const shopCartBtnEl = document.querySelector(".shop-cart-btn");
const shopCartModalEL = document.querySelector(".shop-cart-modal");
const shopCartListEl = document.querySelector(".shop-cart__list");
const backDropEl = document.querySelector(".back-drop");
const backToShopBtnEL = document.querySelector(".shop-cart__back");
const totalPriceEl = shopCartModalEL.querySelector(".total-price");
const shopCartEmptyEl = shopCartModalEL.querySelector(".shop-cart__empty");
const ShopProductsNumberEL = document.querySelector(".header__item-num");

(function renderProducts() {
  products.forEach((product, index) => {
    const productItemEl = document.createElement("li");
    productItemEl.className = "products__item";
    const productCard = `<div class="product-card">
      <div class="product-card__img">
        <img src= ${product.img} alt="img" />
        <svg
          class = ${product.like ? "'liked heart'" : "heart"} 
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill=  "#000000"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </div>
      <div class="product-card__body">
      <h3> ${product.name} </h3>
      <p> ${product.description}</p>     
      </div>
      <div class = "product-card__action" ><button class = 'add-btn' >Add</button></div>
    </div>`;
    productItemEl.innerHTML = productCard;
    const addBtn = productItemEl.querySelector(".add-btn");
    const heartEl = productItemEl.querySelector("svg");
    productsListEl.append(productItemEl);

    addBtn.addEventListener("click", () => {
      addProduct(index, product.id);
    });

    heartEl.addEventListener("click", () => {
      updateLikeUi(heartEl, product);
    });
  });
})();

function toggelShopCartModal() {
  shopCartModalEL.classList.toggle("visible");
  backDropEl.classList.toggle("visible");
}

function addProduct(index, id) {
  const isAlreadyAdded = shopingProducts.find((product) => {
    return product.id === id;
  });

  if (isAlreadyAdded) {
    alert("Already in cart");
    return;
  }
  const shopCartItem = document.createElement("li");
  const product = { ...products[index], qt: 1 };
  const productCard = `
  <div class="shop-cart-card">
    <div class="shop-cart-card__inner">
      <div class="shop-cart-card__img">
        <div class="shop-cart-card__img-box">
          <img src= ${product.img} alt="" />
        </div>
      </div>
      <h2 class="shop-cart-card__title">${product.name}</h2>
      <div class="shop-cart-card__action">
        <div class="shop-cart-card__qt">${product.qt}</div>
        <div class="shop-cart-card__controls">
          <div class="inc cvh">+</div>
          <div class="dec cvh">-</div>
        </div>
      </div>
      <div class="shop-cart-card__sub-total">${product.price}$</div>
      <div class="shop-cart-card__del cvh">
        <div class="btn-del cvh">X</div>
      </div>
    </div>
  </div>`;

  shopCartItem.innerHTML = productCard;
  shopCartItem.className = "shop-cart__item";

  const incBtnEL = shopCartItem.querySelector(".inc");
  const decBtnEL = shopCartItem.querySelector(".dec");
  const qtEl = shopCartItem.querySelector(".shop-cart-card__qt");
  const subTotalEl = shopCartItem.querySelector(".shop-cart-card__sub-total");
  const delBtnEl = shopCartItem.querySelector(".btn-del");

  shopingProducts.push(product);
  shopCartListEl.append(shopCartItem);

  updateCartVueUi();
  updateTotalPriceUi(totalPriceEl);
  updateShopProductsNumberUi();

  incBtnEL.addEventListener("click", () => {
    inc(product, qtEl);
    updateSubPriceUi(product, subTotalEl);
    updateTotalPriceUi(totalPriceEl);
  });
  decBtnEL.addEventListener("click", () => {
    dec(product, qtEl);
    updateSubPriceUi(product, subTotalEl);
    updateTotalPriceUi(totalPriceEl);
  });
  delBtnEl.addEventListener("click", () =>
    delProduct(product.id, shopCartItem)
  );
}

function delProduct(id, item) {
  const productIndex = shopingProducts.findIndex(
    (product) => id === product.id
  );
  shopingProducts.splice(productIndex, 1);
  item.remove();

  updateCartVueUi();
  updateShopProductsNumberUi();
  updateTotalPriceUi(totalPriceEl);
}

function inc(product, el) {
  if (product.qt >= product.maxQt) {
    alert("you have reached the max in stock");
    return;
  }
  product.qt++;
  el.textContent = product.qt;
}

function dec(product, el) {
  if (product.qt === 1) {
    return;
  }
  product.qt--;
  el.textContent = product.qt;
}

function updateCartVueUi() {
  if (shopingProducts.length === 0) {
    shopCartEmptyEl.classList.add("visible");
  } else {
    shopCartEmptyEl.classList.remove("visible");
  }
}

function updateSubPriceUi(product, el) {
  const subTotalPrice = product.qt * product.price;
  el.textContent = subTotalPrice + "$";
}

function updateTotalPriceUi(el) {
  const totalPrice = shopingProducts.reduce(
    (prev, current) => prev + current.price * current.qt,
    0
  );
  el.textContent = totalPrice + "$";
}

function updateShopProductsNumberUi() {
  if (shopingProducts.length === 0) {
    ShopProductsNumberEL.classList.add("hidden");
  } else {
    ShopProductsNumberEL.classList.remove("hidden");
    ShopProductsNumberEL.textContent = shopingProducts.length;
  }
}

function updateLikeUi(el, product) {
  product.like = !product.like;
  el.classList.toggle("liked");
}

shopCartBtnEl.addEventListener("click", toggelShopCartModal);
backDropEl.addEventListener("click", toggelShopCartModal);
backToShopBtnEL.addEventListener("click", toggelShopCartModal);

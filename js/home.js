import { db } from './firebase-init.js';
import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';

// let isLogged = localStorage.getItem('isLogged');
// if (isLogged == null) {
//   isLogged = false;
// }
// if (isLogged == false) {
//   window.location.href = '../pages/login.html';
// }

const toTop = document.querySelector('.to-top');

toTop.onclick = function () {
  window.scrollTo(0, 0);
};

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
});

toTop.onclick = function () {
  window.scrollTo(0, 0);
};

const body = document.querySelector('body');

function toggleDarkMode() {
  const flag = body.className;
  if (flag === 'light') {
    body.classList.replace('light', 'dark');
  } else {
    body.classList.replace('dark', 'light');
  }
}

window.toggleDarkMode = toggleDarkMode;

const toggle = document.querySelector('.toggle');

toggle.addEventListener('click', () => toggle.classList.toggle('active'));

async function getAllFirestore(collectionName) {
  try {
    const items = [];
    const snapShots = await getDocs(collection(db, collectionName));
    snapShots.forEach((doc) => {
      const item = { docId: doc.id, ...doc.data() };
      items.push(item);
    });

    return items;
  } catch (e) {
    console.error('Error get document: ', e);
  }
}

const products = await getAllFirestore('Home Page');
async function renderProducts() {
  for (let product of products) {
    let content = `
  <div class="product">
    <div class="img-container">
      <img
        src=${product.imgSrc}
        alt=""
      />
    </div>
    <div class="product-condition" id="product-condition">
      <p>${product.condition}</p>
    </div>
    <p class="product-name">${product.name}</p>
    <p class="product-prize">$${product.prize}.00</p>
  </div>
    `;
    document.getElementById('products-list').innerHTML += content;
  }
}

// await renderProducts();
// for (let product of products) {
//   if (product.condition == 'Sale') {
//     document.getElementById('product-condition').style.backgroundColor =
//       '#fb1d1d';
//   } else if (product.condition == '') {
//     document.getElementById('product-condition').style.backgroundColor =
//       'transparent';
//   } else {
//     document.getElementById('product-condition').style.backgroundColor =
//       '#fb6c1d';
//   }
// }

var swiper = new Swiper('.product-swiper', {
  spaceBetween: 30,
  centeredSlides: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const items = await getAllFirestore('Cart');

// const totalItems = items.reduce((acc, item) => item.quantity + acc, 0);
// console.log('Total quantity', totalItems);

let totalItems = items.length;
console.log(totalItems);

document.getElementById('counter').innerHTML = totalItems;

// append vao innerHtml the span

document.getElementById('cart-icon').addEventListener('click', () => {
  window.location.href = '../pages/cart.html';
});

document.getElementById('account-icon').addEventListener('click', () => {
  window.location.href = '../pages/account.html';
});

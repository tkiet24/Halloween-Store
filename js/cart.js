import { db } from './firebase-init.js';
import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';

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
let sum = 0.0;

//B1: lay duoc data tu firestore
const items = await getAllFirestore('Cart');

async function renderCart() {
  console.log('From cart: ', items);

  //B2: render DOM
  for (let item of items) {
    const content = `
    <div class="product-row">
    <div class="img-container">
      <img
        src="${item.img}"
        alt=""
      />
    </div>
    <div class="product-desc">
      <p id="product-name">${item.name}</p>
      <p id="product-prize">$${item.price}</p>
    </div>
    <div class="quantity-selection">
      <label for="">Quantity</label>
      <input id="quantity" type="number" value="${
        item?.quantity
      }" min="0" max="99" />
    </div>
    <div class="final-prize" id="final-prize" >
      <span>$${calculateByQuantity(item.price, item.quantity)}</span>
    </div>
    <div class="delete-icon">
    <i class="fa-solid fa-pen-to-square" id="update-quantity" itemId="${
      item.docId
    }" onclick="handleUpdate(this)"></i>
      <i class="fa-solid fa-trash" itemId="${
        item.docId
      }" onclick="handleDelete(this)" ></i>

    </div>
  </div>
      `;

    document.getElementById('rows-container').innerHTML += content;
    sum += parseFloat(calculateByQuantity(item.price, item.quantity));

    console.log(sum);
  }
}

async function updateFirestore(docId, newItem, collectionName) {
  try {
    const itemRef = doc(db, collectionName, docId);
    await updateDoc(itemRef, newItem);
    console.log('Item updated with id', docId);
  } catch (e) {
    console.log('Error update document: ', e);
  }
}

async function handleUpdate(update) {
  const docId = update.getAttribute('itemId');
  const oldItem = items.filter((item) => item.docId == docId)[0];
  const parentDom = update.parentElement.parentElement;
  let newQuantity = parentDom.querySelector('#quantity').value;
  newQuantity = newQuantity ? parseInt(newQuantity) : 0;

  const newItem = { ...oldItem, quantity: newQuantity };
  await updateFirestore(docId, newItem, 'Cart');
  window.location.reload();
}

window.handleUpdate = handleUpdate;

async function deleteFirestore(docId, collectionName) {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    console.log('Item deleted with id', docId);
  } catch (e) {
    console.log('Error delete document: ', e);
  }
}

async function handleDelete(remove) {
  const docId = remove.getAttribute('itemId');
  await deleteFirestore(docId, 'Cart');
  window.location.reload();
}

window.handleDelete = handleDelete;

await renderCart();

function take_decimal_number(num, n) {
  //num : số cần xử lý
  //n: số chữ số sau dấu phẩy cần lấy
  let base = 10 ** n;
  let result = Math.round(num * base) / base;
  return result;
}

let totalPrice = 0;
let quantity = document.getElementById('quantity').value;
for (let item of items) {
  console.log(item.price);
  totalPrice = item.price * quantity;
}

function renderFinalPrice(sum) {
  let content = `
  <p id="total-items">Total ${items.length} item(s)</p>
  <hr />
  <p id="total-price">Total price <span>$${sum}</span></p>
  
  `;

  document.getElementById('total-container').innerHTML = content;
}

renderFinalPrice(sum);

document
  .getElementById('update-total-prize-btn')
  .addEventListener('click', () => {
    console.log('hello');
  });

// console.log(quantity);
function calculateByQuantity(price, quantity = 1) {
  return parseFloat(price * quantity).toFixed(2);
}

async function changeQuantity(docId, item, newQuantity) {
  if (newQuantity < 0) {
    return;
  }
  await updateFirestore(docId, { ...item, quantity: newQuantity }, 'cart');
}

let totalItems = items.length;
console.log(totalItems);

document.getElementById('counter').innerHTML = totalItems;

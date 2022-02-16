const balance = document.getElementById('balance');
const prices = document.getElementById('money-plus');
const discounts = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const quantity = document.getElementById('quantity');



/*const dummyBasket = [
    { id: 1, text: 'camera', amount: 12000, quantity: 1 },
    { id: 2, text: 'cover', amount: 2000, quantity: 3 },
    { id: 3, text: 'laptop', amount: 102000, quantity: 1 },
    { id: 4, text: 'discount', amount: -10000, quantity: 1 }
]*/

const localStorageBasket = JSON.parse(localStorage.getItem('baskets'));


let baskets = localStorage.getItem('baskets') !== null ? localStorageBasket : [];


//Add values to Basket
function addToBasket(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '' || quantity.value.trim() === '') {
        alert('Please enter the complete details');
    }
    else {
        const basket = {
            id: generateId(),
            text: text.value,
            amount: parseFloat(amount.value),
            quantity: parseInt(quantity.value),

        };
        baskets.push(basket);
        addBasketDom(basket);
        updateValues();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
        quantity.value = '';

    }

}

//Generate ID
function generateId() {
    return Math.floor(Math.random() * 100);
}
//Add basket to DOMList
function addBasketDom(basket) {
    const sign = basket.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(basket.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `${basket.text} <span>${sign}${Math.abs(basket.amount)}</span>
                        <span>X${basket.quantity}</span>
                        <button class="delete-btn" onclick = "removeBasket(${basket.id})">x</button>`;
    list.appendChild(item);
}

//Update the balance, price and discount
function updateValues() {
    const amounts = baskets.map(basket => basket.amount * basket.quantity);
    const total = amounts.reduce((acc, item) => (acc = acc + item), 0).toFixed(2);
    const price = amounts.filter(item => item > 0)
        .reduce((acc, item) => (acc = acc + item), 0)
        .toFixed(2);
    const discount = (
        amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc = acc + item), 0) * -1)
        .toFixed(2);
    balance.innerText = `Rs${total}`;
    prices.innerText = `Rs${price}`;
    discounts.innerText = `Rs${discount}`;


}

//Remove from basket
function removeBasket(id) {
    baskets = baskets.filter(basket => basket.id !== id);
    updateLocalStorage();
    init();
}

//Update local storage
function updateLocalStorage() {
    localStorage.setItem('baskets', JSON.stringify(baskets));

}

function init() {
    list.innerHTML = '';
    baskets.forEach(addBasketDom);
    updateValues();
}
init();
form.addEventListener('submit', addToBasket);

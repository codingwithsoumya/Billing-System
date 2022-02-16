let billingDate = document.getElementById('date');
let id = document.getElementById('generate-id');
let balance = document.getElementById('balance');
let dis = document.getElementById('discount');
let gst = document.getElementById('gst');
let sum = 0;
let discount = 0;
let table = document.getElementById('myTable')
let iid = Math.round(Math.random() * 100000);
let date = new Date()
const basket = JSON.parse(localStorage.getItem('baskets'));
for (let j = 0; j < basket.length; j++) {
    let tot;
    tot = basket[j].amount * basket[j].quantity;
    sum = (sum + tot);
    tot = 1;
}

buildTable(basket)

function buildTable(data) {

    for (let i = 0; i < data.length; i++) {
        if (data[i].amount < 0) {
            data[i].amount *= (-1);
            discount = discount + data[i].amount;
            continue;
        }
        row = `<tr>
                        <td>${i + 1}</td>
                        <td>${data[i].text}</td>
                        <td>${data[i].quantity}</td>
                        <td>${data[i].amount}</td>
                      </tr>`
        table.innerHTML += row
    }
}
gst.innerHTML = `GST : ${Math.floor((18 / 100) * sum)} Rs`
dis.innerHTML = `Discount Applied : ${discount} Rs`;
billingDate.innerHTML = date.toString();
id.innerHTML = ` Customer id : ${iid}`;
balance.innerHTML = ` Total: ${sum} Rs`;


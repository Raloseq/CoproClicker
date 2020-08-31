const btnEarnMoney = document.querySelector('.earn-money');
const gainedMoney = document.querySelector('.current-money');
const currentWorkPosition = document.querySelector('.current-position');
const clear = document.querySelector('.clear');
const moneyPerSecondInfo = document.querySelector('.money-second');
// ITEMS
const firstItem = document.querySelector('.first-item');
const itemPriceFirst = document.querySelector('.item-price-first');
const itemAmountFirst = document.querySelector('.item-amount-first');
const firstItemInfo = document.querySelector('.item-info-first');
const secondItem = document.querySelector('.second-item');
const itemPriceSecond = document.querySelector('.item-price-second');
const itemAmountSecond = document.querySelector('.item-amount-second');
const secondItemInfo = document.querySelector('.item-info-second');

const itemPrice = document.querySelectorAll(".item-price");
let gameMoney = {
    money: 0,
    moneyPerClick: 1,
    moneyPerSecond: 0
};
let items = [{
        name: "Create report",
        price: 10,
        amount: 0
    },
    {
        name: "Sell product",
        price: 150,
        amount: 0
    },
    {
        name: "Get client",
        price: 200,
        amount: 0
    },
    {
        name: "Create product",
        price: 250,
        amount: 0
    },
    {
        name: "Export product",
        price: 300,
        amount: 0
    }
];
let upgrades = [{
        name: "Knowledge",
        price: 150,
        status: false
    },
    {
        name: "Customer",
        price: 200,
        status: false
    },
    {
        name: "Leadership",
        price: 250,
        status: false
    },
    {
        name: "Own Product",
        price: 300,
        status: false
    },
    {
        name: "To The World",
        price: 350,
        status: false
    }
];
const workPosition = {
    first: "Stażysta",
    second: "Pracownik",
    third: "Manager",
    fourth: "Kierownik",
    fifth: "Prezes",
};
//GAME
btnEarnMoney.addEventListener('click', () => {
    gameMoney.money += gameMoney.moneyPerClick;
    gainedMoney.textContent = gameMoney.money;
});

const test = (arrayLength,amount,price,mpc) => {
    if(gameMoney.money > items[arrayLength].price) {
        gameMoney.money -= items[arrayLength].price;
        items[arrayLength].amount+=amount;
        items[arrayLength].price += price;
        gameMoney.moneyPerClick += mpc;
    } else {
        alert("Masz za malo pieniedzy");
    }
}
// ITEMS
firstItem.addEventListener('click',()=>{
    test(0,1,10,1);
});

secondItem.addEventListener('click',()=>{
    if(gameMoney.money > items[1].price) {
        gameMoney.money -= items[1].price;
        items[1].amount++;
        items[1].price += 20;
        gameMoney.moneyPerClick += 2;
    } else {
        alert("Masz za malo pieniedzy");
    }
});
// UPGRADES 

// LOAD SAVE
document.addEventListener("DOMContentLoaded", () => {
    const gameMoneyLS = JSON.parse(localStorage.getItem("money"));
    const gameItemsLS = JSON.parse(localStorage.getItem("items"));
    if (gameMoneyLS) {
        gameMoney = gameMoneyLS;
        gainedMoney.textContent = gameMoneyLS.money;
        moneyPerSecondInfo.textContent = gameMoney.moneyPerClick;
    }
    if (gameItemsLS) {
        items = gameItemsLS;  
    }
});

setInterval(()=>{
    gainedMoney.textContent = gameMoney.money;
    moneyPerSecondInfo.textContent = gameMoney.moneyPerClick;
    itemPriceFirst.textContent = `Koszt: ${items[0].price}`;
    itemAmountFirst.textContent = `Ilosc: ${items[0].amount}`;
    itemPriceSecond.textContent = `Koszt: ${items[1].price}`;
    itemAmountSecond.textContent = `Ilosc: ${items[1].amount}`;
},1000);

setInterval(() => {
    localStorage.setItem("money", JSON.stringify(gameMoney));
    localStorage.setItem("items", JSON.stringify(items));
}, 1000);
//localStorage.clear();
// WORK POSITION
// switch(true) {
//     case (money >= 5 && money < 20):
//          currentWorkPosition.textContent = workPosition.second;
//         break;
//     case (money >= 20 && money < 50):
//          currentWorkPosition.textContent = workPosition.third;
//         break;
//     case (money >= 50 && money < 100):
//          currentWorkPosition.textContent = workPosition.fourth;
//         break;
//     case (money >= 100):
//          currentWorkPosition.textContent = workPosition.fifth;
//          alert("Jestes na szczycie brawo");
//         break;
//     default:
//         currentWorkPosition.textContent = workPosition.first;
// }
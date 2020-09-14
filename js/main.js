const btnEarnMoney = document.querySelector('.earn-money');
const gainedMoney = document.querySelector('.current-money');
const currentWorkPosition = document.querySelector('.current-position');
const clear = document.querySelector('.clear');
const moneyPerClickInfo = document.querySelector('.money-click');
const moneyPerSecondInfo = document.querySelector('.money-second');
// ITEMS
const itemBtn = document.querySelectorAll('.item-btn');
const itemPrice = document.querySelectorAll('.item-price');
const itemAmount = document.querySelectorAll('.item-amount');
// UPGRADES 
const upgradeBtn = document.querySelectorAll('.upgrade-btn');
const upgradeStatus = document.querySelectorAll('.upgrade-status');
const upgradePrice = document.querySelectorAll('.upgrade-price');

const upgradeCart = document.querySelectorAll('.upgrade-cart');
let gameMoney = {
    money: 0,
    moneyPerClick: 1,
    moneyPerSecond: 0
};
let items = {
    '1': {
        name: "Create report",
        price: 30,
        amount: 0,
        mpc: 1,
        mps: 0
    },
    '2': {
        name: "Sell product",
        price: 80,
        amount: 0,
        mpc: 2,
        mps: 0
    },
    '3': {
        name: "Get client",
        price: 180,
        amount: 0,
        mpc: 0,
        mps: 1
    },
    '4': {
        name: "Create product",
        price: 250,
        amount: 0,
        mpc: 3,
        mps: 2
    },
    '5': {
        name: "Export product",
        price: 450,
        amount: 0,
        mpc: 4,
        mps: 3
    }
};
let upgrades = {
    '1':{
        name: "Knowledge",
        price: 10,
        status: false,
        mpc: 2,
        mps: 0
    },
    '2':{
        name: "Customer",
        price: 0,
        status: false,
        mpc: 4,
        mps: 0
    },
    '3':{
        name: "Leadership",
        price: 0,
        status: false,
        mpc: 0,
        mps: 2
    },
    '4':{
        name: "Own Product",
        price: 0,
        status: false,
        mpc: 3,
        mps: 3
    },
    '5':{
        name: "To The World",
        price: 0,
        status: false,
        mpc: 8,
        mps: 3
    }
};
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
    gainedMoney.textContent = gameMoney.money.toFixed();
});

const itemBuy = (item) => {
    if (gameMoney.money > item.price) {
        gameMoney.money -= item.price;
        item.amount += 1;
        item.price *= 1.3;
        gameMoney.moneyPerClick += item.mpc;
        gameMoney.moneyPerSecond += item.mps;
    } else {
        alert("Masz za malo pieniedzy");
    }
}
const upgradeBuy = (upgrade,index) => {
    if(gameMoney.money > upgrade.price) {
        gameMoney.money -= upgrade.price;
        upgrade.status = true;
        items[index].mpc = upgrade.mpc;
        items[index].mps = upgrade.mps;
    } else {
        alert("Masz za malo pieniedzy");
    }
}
const getItem = (itemId,objectName) => {
    return objectName[itemId];
}

function itemClick() {
    let itemId = this.dataset.id;
    let item = getItem(itemId,items);
    itemBuy(item);
}
function upgradeClick() {
    let upgradeId = this.dataset.id;
    let item = getItem(upgradeId,upgrades);
    upgradeBuy(item,upgradeId);
}

itemBtn.forEach(e => e.addEventListener('click', itemClick))
upgradeBtn.forEach(e => e.addEventListener('click',upgradeClick));

upgradeBtn.forEach(e=>{
    e.addEventListener('click',(event)=>{
        const text = event.target.parentElement.firstElementChild.innerHTML;
        if(!text.includes('Brak')){
            e.style.display = "none";
        }
    })
})
// LOAD SAVE
document.addEventListener("DOMContentLoaded", () => {
    const gameMoneyLS = JSON.parse(localStorage.getItem("money"));
    const gameItemsLS = JSON.parse(localStorage.getItem("items"));
    const gameUpgradesLS = JSON.parse(localStorage.getItem("upgrades"));
    if (gameMoneyLS) {
        gameMoney = gameMoneyLS;
    }
    if (gameItemsLS) {
        items = gameItemsLS;
    }
    if(gameUpgradesLS) {
        upgrades = gameUpgradesLS;
    }
});

setInterval(() => {
    gainedMoney.textContent = gameMoney.money.toFixed();
    gameMoney.money += gameMoney.moneyPerSecond;
    moneyPerClickInfo.textContent = `Za klikniecie: ${gameMoney.moneyPerClick}`;
    moneyPerSecondInfo.textContent = `Na sekunde: ${gameMoney.moneyPerSecond}`;
    itemPrice.forEach((item,index)=>item.textContent = `Koszt: ${items[index+1].price.toFixed()}`)
    itemAmount.forEach((item,index)=>item.textContent = `Ilość: ${items[index+1].amount}`)

    upgradeStatus.forEach((item,index) => {
        if(upgrades[index+1].status == false) {
            item.textContent = "Status: Brak";
        } else {
            item.textContent = "Status: Zakupione";
        }
    });
    upgradePrice.forEach((item,index) => item.textContent = `Koszt: ${upgrades[index+1].price}`);
    positionInWork(gameMoney.money);
}, 1000);


setInterval(() => {
    localStorage.setItem("money", JSON.stringify(gameMoney));
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("upgrades", JSON.stringify(upgrades));
}, 1000);
const clearStorage = () => {
    localStorage.clear();
}
clear.addEventListener('click',clearStorage);
// localStorage.clear();
// WORK POSITION

const positionInWork = (money) => {
    switch(true) {
        case money >= 100 && money < 200:
            currentWorkPosition.textContent = workPosition.second;
            break;
        case money >= 200 && money < 400:
            currentWorkPosition.textContent = workPosition.third;
            break;
        case money >= 400 && money < 800:
            currentWorkPosition.textContent = workPosition.fourth;
            console.log("es");
            break;
        case money >= 800:
            currentWorkPosition.textContent = workPosition.fifth;
            alert("Jestes na szczycie brawo");
        default:
            currentWorkPosition.textContent = workPosition.first;
    }
}

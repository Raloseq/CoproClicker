const btnEarnMoney = document.querySelector('.earn-money');
const gainedMoney = document.querySelector('.current-money');
const currentWorkPosition = document.querySelector('.current-position');
const clear = document.querySelector('.clear');
const priceFirst = document.querySelector('.price-upgrade');
const firstUpgrade = document.querySelector('.first-upgrade');
let items = [
    {
        name: "Create report",
        price: 100,
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
]
let upgrades = [
    {
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
]
let money = 0;
let moneyPerSecond = 0;
const workPosition = {
    first: "Stażysta",
    second: "Pracownik",
    third: "Manager",
    fourth: "Kierownik",
    fifth: "Prezes",
}
// CLICK GAME
btnEarnMoney.addEventListener('click',()=>{
    money++;
    gainedMoney.textContent = money;
});
// UPGRADES
firstUpgrade.addEventListener('click',()=>{
    money = money - 10;
    items[0].price *= 1.1;
    items[0].amount++;
});
console.log(items[0]);
// LOAD SAVE
const load = () => {
    money = localStorage.getItem('money');
    moneyPerSecond = localStorage.getItem('moneyPerSecond');
    items = JSON.parse(localStorage.getItem('items'));
    upgrades = JSON.parse(localStorage.getItem('upgrades'));
    gainedMoney.textContent = money;
 }
 load();

clear.addEventListener('click',()=>{
    localStorage.removeItem('money');
    localStorage.removeItem('moneyPerSecond');
    localStorage.removeItem('items');
    localStorage.removeItem('upgrades');
    items[0].price = 100;
    items[0].amount = 0;
    money = 0;
    gainedMoney.textContent = money;
    
});
const save = setInterval(()=>{
    localStorage.setItem('money',money);
    localStorage.setItem('moneyPerSecond',moneyPerSecond);
    localStorage.setItem('items',JSON.stringify(items));
    localStorage.setItem('upgrades',JSON.stringify(upgrades));
},2000);

// WORK POSITION
switch(true) {
    case (money >= 5 && money < 20):
         currentWorkPosition.textContent = workPosition.second;
        break;
    case (money >= 20 && money < 50):
         currentWorkPosition.textContent = workPosition.third;
        break;
    case (money >= 50 && money < 100):
         currentWorkPosition.textContent = workPosition.fourth;
        break;
    case (money >= 100):
         currentWorkPosition.textContent = workPosition.fifth;
         alert("Jestes na szczycie brawo");
        break;
    default:
        currentWorkPosition.textContent = workPosition.first;
}
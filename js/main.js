const btnEarnMoney = document.querySelector('.earn-money');
const gainedMoney = document.querySelector('.current-money');
const currentWorkPosition = document.querySelector('.current-position');
const clear = document.querySelector('.clear');
const firstUpgrade = document.querySelector('.first-upgrade');
const upgrades = {
    first: false,
}
let money = 0;
const workPosition = {
    first: "Stażysta",
    second: "Pracownik",
    third: "Manager",
    fourth: "Kierownik",
    fifth: "Prezes",
}
// CLICK GAME
btnEarnMoney.addEventListener('click',()=>{
    if(upgrades.first) {
        money = money + 2;
        gainedMoney.textContent = money;
    } else {
        money++;
        gainedMoney.textContent = money;
    }
});
firstUpgrade.addEventListener('click',()=>{
    if(money - 10 < 0) {
        alert("Za malo kasy")
    } else {
        money = money - 10;
        upgrades.first = true;
        gainedMoney.textContent = money;
        console.log(upgrades.first)
    }
});
// LOAD SAVE
const load = () => {
    if(localStorage.getItem('money')) {
        money = localStorage.getItem('money');
        gainedMoney.textContent = money;
    } else {
        money = 0;
        gainedMoney.textContent = 0;
    }
 }
 load();

clear.addEventListener('click',()=>{
    localStorage.removeItem('money');
    money = 0;
    gainedMoney.textContent = money;
});
const save = setInterval(()=>{
    localStorage.setItem('money',money);
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

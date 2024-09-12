import { Country_List } from './countries.js';

const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector('form .reverse');
const amount = document.querySelector('.amount input');
const exRateTxt = document.querySelector('form .result');


// Event listeners for currency dropdowns(made possible with the select html tag)

[fromCur, toCur].forEach((select, i) => {
    for(let currCode in Country_List) {
        const selected = (i === 0 && currCode === "USD" ) || (i === 1 && currCode === "GBP") ? "selected" : " ";
        select.insertAdjacentHTML('beforeend', `<option value="${currCode}" ${selected}>${currCode}</option>`);
    }

    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img"); 
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;

    })
});


// Function to get exchange rate from api
async function getExchangeRate(){
    const amountVal = amount.value || 1;
    exRateTxt.innerText = "Getting exchange rate..."
    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/ecd2dd361563e1074ab52692/latest/${fromCur.value}`)    
        const result = await response.json();
        const exchangeRate = result.conversion_rates[toCur.value];
        const totalExRate = (amountVal * exchangeRate).toFixed(2);
        exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`
    } catch (error) {
        exRateTxt.innerText = "Something Went Wrong"
    }
}

//Event Listeners for button and exchange icon click
window.addEventListener("load", getExchangeRate);
getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
}
);

exIcon.addEventListener('click', () => {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
    [fromCur, toCur].forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img"); 
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
     

    });
    getExchangeRate();

})























/* To Understand the use of in keyword with an object 
Not Relevant to the project.
*/
// const person = {
//   name: 'John',
//   age: 30,
//   profession: 'Engineer'
// };

// for (const key in person) {
//   console.log(key, person[key]); // Logs the key and its corresponding value
// }

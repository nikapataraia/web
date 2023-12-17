
const name_holder = document.getElementById("name-display")
const number_display = document.getElementById("number-display");
const num = localStorage.getItem('num')

const card_amount = num*num;
name_holder.textContent = localStorage.getItem('pname');
number_display.textContent = num;
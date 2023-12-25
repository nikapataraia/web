
const name_holder = document.getElementById("name-display")
const number_display = document.getElementById("number-display");
const num = localStorage.getItem('num')

const card_amount = num*num;
name_holder.textContent = localStorage.getItem('pname');
number_display.textContent = num;

const halfCardArray = Array.from({ length: card_amount / 2 }, (_, index) => index + 1);


const fullCardArray = [...halfCardArray, ...halfCardArray];


for (let i = fullCardArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fullCardArray[i], fullCardArray[j]] = [fullCardArray[j], fullCardArray[i]];
}


const card_container = document.getElementById("card_container")

const cardWidthPercentage = (100 - (num * 2 * 1))/num ;
console.log(cardWidthPercentage)
for (let i = 0; i < fullCardArray.length; i++) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card"; 
    cardDiv.textContent = fullCardArray[i];
    cardDiv.style.width = `${cardWidthPercentage}%`;
    cardDiv.style.height = `${cardWidthPercentage * 1.5}%`;
    cardDiv.style.marginLeft = "1%";
    cardDiv.style.marginRight = "1%"
    cardDiv.addEventListener('click', (event) => flipcard(event, i));
    card_container.appendChild(cardDiv);
}


flipedcard = -1
isfliped = false
guessedcards = 0

function flipcard(event,index){
 const clickedCard = event.currentTarget;
 if(isfliped){
    const flipedcardcontent = card_container.childNodes[flipedcard].textContent
    if(flipedcardcontent == clickedCard.textContent){
        disable(flipedcard,index)
    }
 }
 else{
    flipedcard = index;
 }
 isfliped = !isfliped
}


function disable(card1_index,card2_index){
    const card1 = card_container.childNodes[card1_index];
    const card2 = card_container.childNodes[card2_index];

    card1.style.backgroundColor = 'green';
    card2.style.backgroundColor = 'green';

    card1.removeEventListener('click', flipcard);
    card2.removeEventListener('click', flipcard);
}


function ckeck_game(){

}
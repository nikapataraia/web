const add_but = document.getElementById("#item_input_but");
let counter = 1;


function add(){
    {
    var container = document.getElementById('items');
    var val = document.querySelector('#iteminput').value;
    if(val == ""){
        window.alert("you need an input value")
        return;
    }
    const newdiv = document.createElement("div");
    newdiv.classList.add("item_holder")
    newdiv.innerHTML = `
    <input  onchange="cross(this)" type="checkbox">
    <p class="item_text"> ${val} </p>
    <button onclick = "delete_task(this)" class="item_delete_but" data-id = "${counter}" id="delete_${counter}"> DELETE</button>`
    counter++;
    container.appendChild(newdiv)
}
}

function delete_task(button){
    const parentd = button.parentNode;
    const par_par = parentd.parentNode;
    par_par.removeChild(parentd)
}

function cross(checker){
    console.log(checker.checked)
    const parentd = checker.parentNode;
    var id = parentd.querySelector('button');
    id = id.getAttribute('data-id');
    var val = parentd.querySelector('p');
    val = val.textContent;
    console.log(!checker.ckecked)
    if(!checker.ckecked){
    parentd.innerHTML = `
    <input onchange="cross(this)" type="checkbox" checked>
    <p class="item_text"><s> ${val} </s></p>
    <button onclick = "delete_task(this)" class="item_delete_but" data-id = "${id}" id="delete_${id}"> <s>DELETE </s></button>
    `
    var ut = parentd.querySelector('input');
    ut.checked = false;
    console.log('fir')
    }
    else{
    parentd.innerHTML = `
    <input onchange="cross(this)" type="checkbox" >
    <p class="item_text"> ${val} </p>
    <button onclick = "delete_task(this)" class="item_delete_but" data-id = "${id}" id="delete_${id}"> DELETE </button>
    `;
    var ut = parentd.querySelector('input');
    ut.checked = true;
    console.log('sec')
    }

}

// am not sure if when the task is scratched if the delete button should work or not, so if it should this is the code
// if it sohuld not i would just give data-id = "-1" and add if statement to delete function, if data-id == -1 dont delete
// data-id will never get to -1 on its own because its autoincrementing.
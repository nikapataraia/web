


document.getElementById('submitbutton').addEventListener('click', function(event) {
    event.preventDefault();
    
    var nameValue = document.getElementById("name-input").value;
    var cards_num = document.getElementById("num-input").value;

    if (nameValue == "" || nameValue == undefined || cards_num <= 0 || cards_num % 2 == 1) {
        alert("Invalid input!");
        return;
    }
    localStorage.setItem('pname', nameValue)
    localStorage.setItem('num', cards_num);
    window.location.href = "game.html";
});

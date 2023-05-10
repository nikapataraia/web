function check(){
    var pass = document.getElementById("pass")
    var pass_conf = document.getElementById("pass_conf")
    var sub_button = document.getElementById("submit")
    var email = document.getElementById("email")
    var namee = document.getElementById("name")
    if(pass.value.length < 8){
        fail()
        return
    }
    if(namee.value.length < 3){
        fail()
        return
    }
    if(!isValidEmail(email.value)){
        fail()
        return
    }
    if(pass.value != pass_conf.value){
        fail()
        return
    }
    dosmthelse()
}
function isValidEmail(value) {
    const atLocation = value.lastIndexOf("@");
    const dotLocation = value.lastIndexOf("."); 
    return (
        atLocation > 0 &&
        dotLocation > atLocation + 1 &&
        dotLocation < value.length - 1
    );
}
function fail(){
console.log("u failed!!!!!")
}
function dosmthelse(){
console.log("GJ")
}

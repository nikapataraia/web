var questions = [{
    question: "What was the most used programming language in 2019?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d"
  },
  {
    question: "Who is the President of US?",
    a: "Donald Trump",
    b: "Joe Biden",
    c: "Hillary Clinton",
    d: "Bernie Sanders",
    correct: "b"
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "none of the above",
    correct: "a"
  },
  {
    question: "What year was JavaScript launched?",
    a: "1993",
    b: "1994",
    c: "1995",
    d: "1996",
    correct: "c"
  }
];

const placeholder = questions.slice();
let ans_count = 0;
let current_ans = '';
const button = document.getElementById('quiz_submit_but');

function takerandom(){
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions.splice(randomIndex,1);
}

function generate(){
    var element = takerandom();
    if(element.length == 0){
        display_result() 
        return false;
    }
    const container = document.querySelector('.question_holder');
    var my_ps = container.querySelectorAll('p');
    element = element[0];
    my_ps[0].textContent = element.question
    my_ps[1].textContent = element.a
    my_ps[2].textContent = element.b
    my_ps[3].textContent = element.c
    my_ps[4].textContent = element.d
    current_ans = element.correct;
    return true;
}


function display_result(){   
    const container = document.querySelector('.question_holder');
    var label_lst = container.querySelectorAll('label');
    label_lst.forEach((el) => el.style.display = 'none');
    var textholder = container.querySelector('#question')
    textholder.textContent = `you answered correctly at ${ans_count}/4 questions`
    var button = container.querySelector('button')
    button.textContent = 'Reload';
    button.style.marginTop = '0px';
    ans_count = 0;
}

generate()

button.addEventListener("click" , function(event){
    event.preventDefault();
    const container = document.querySelector('.question_holder');
    var label_lst = container.querySelectorAll('label');
    if(label_lst[0].style.display == 'none'){
        questions = placeholder.slice();
        label_lst.forEach((el) => el.style.display = 'flex');
        var button = container.querySelector('button')
        button.textContent = 'Submit';
        button.style.marginTop = '50px';
        return generate()
    }
    const a = document.getElementById('a');
    const b = document.getElementById('b');
    const c = document.getElementById('c');
    const d = document.getElementById('d');
    var array = [a,b,c,d]
    console.log(array)
    const isAtLeastOneUnselected = array.some((radio) => radio.checked);
    if(!isAtLeastOneUnselected){
        alert("select your answer")
        return false;
    }
    const selected = array.findIndex((radio) => radio.checked)
    if(selected == current_ans.charCodeAt(0) - 97){
        ans_count = ans_count + 1
    }
    return generate();
})

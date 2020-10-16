// Define references to HTML elements
const startQuiz = document.querySelector("#start");
const welcomePg = document.querySelector(".welcome");
const questionRow = document.querySelector(".question-row");
const questions = document.querySelector(".questions");
const options = document.querySelector(".options");

// Create an object that holds the quiz questions, multi-choice options and the answers
const quizQues = [
    {q: "1) Javascript is a _______-side programming language.",
     a: "Both",
     opt: ["Client", "Server", "Both", "None"]},
    {q: '2) How do you write "Hello World!" in an alert box?',
     a: 'alert("Hello World!")',
     opt: ['alert("Hello World!")', 'alertBox("Hello World!")', 'confirm("Hello World!")', 'prompt("Hello World!")']},
    {q: "3) How do you create a function in Javascript?",
     a: "function myFunction()",
     opt: ["function myFunction()", "function:myFunction()", "function = myFunction()", "myFunction()"]},
    {q: "4) How does a FOR loop start?",
     a: "for(var i = 0; i <= 5; i++)",
     opt: ["for(var i = 0; i <= 5)", "for(var i = 0; i <= 5; i++)", "for var i = 1 to 5", "for(i <=5; i++)"]}, 
    {q: "5) How do you find the minimum of x and y using Javascript?",
     a: "Math.min(x,y)",
     opt: ["min(x,y)", "Math.floor(x,y)", "math.Min(x,y)", "Math.min(x,y)"]}
]

// Initialize the index, score and time variables

let currentIndex = 0;

// Create functions/loops
   // For setting time interval
   
// Created a function that displays the questions and the corresponding multi-choice options to the user using a loop
function displayQues(currQuesObj){
    questions.textContent = currQuesObj.q;
    for (let i = 0; i < currQuesObj.opt.length; i++){
    options.children[i].textContent = currQuesObj.opt[i];
    }
}

// Add event listeners
   // to the Start Quiz button when user clicks it
startQuiz.addEventListener("click", function(){
    welcomePg.classList.add("hide");
    questionRow.classList.remove("hide");
    displayQues(quizQues[currentIndex]);
})

   // to the options when user clicks on it to select an option
   // to the Submit button when user enters the initials to submit
   // to the Clear-Highscores button when user clicks on it to delete all the existing highscores
   // to the Take-Quiz-again button to return back to main page to restart the quiz
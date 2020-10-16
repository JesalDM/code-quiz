// Define references to HTML elements
const startQuiz = document.querySelector("#start");
const welcomePg = document.querySelector(".welcome");
const questionRow = document.querySelector(".question-row");
const questions = document.querySelector(".questions");
const options = document.querySelector(".options");
const countdown = document.querySelector("#time");
const displayAns = document.querySelector(".display-answer");
const points = document.querySelector("#score");
const initialsPg = document.querySelector("#initials-pg");
const finalScore = document.querySelector("#final-score");

// Create an object that holds the quiz questions, multi-choice options and the answers.
/* The quiz questions have been taken from the following 2 websites:
     https://www.w3schools.com/js/js_quiz.asp
     https://data-flair.training/blogs/javascript-quiz/ */
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
let secondsLeft = 180;
let score = 0;

// Create functions/loops
   // For setting time interval
function setTime(){
    let timer = setInterval(function(){
         secondsLeft--;
         countdown.textContent= secondsLeft;
         // clear the timer if user cannot complete the quiz within 180 secs or when user has completed all teh questions before time
         if(secondsLeft===0 || currentIndex===quizQues.length){
             clearInterval(timer);
             countdown.textContent=0;
         }
     },1000);
 }
   
// Created a function that displays the questions and the corresponding multi-choice options to the user using a loop
function displayQues(currQuesObj){
    questions.textContent = currQuesObj.q;
    for (let i = 0; i < currQuesObj.opt.length; i++){
    options.children[i].textContent = currQuesObj.opt[i];
    }
}

// Added event listener to the Start Quiz button when user clicks it
startQuiz.addEventListener("click", function(){
    // hides the welcome page
    welcomePg.classList.add("hide");
    // brings up the Question page
    questionRow.classList.remove("hide");
    // executes the function that will display the 1st question
    displayQues(quizQues[currentIndex]);
    // timer starts as soon as user clicks on this button
    setTime();
})

// Added event listener to the options when user clicks to select an option
// Used event delegation to handle the click event
options.addEventListener("click", function(event){
    if(event.target.matches("li")){
        // compare user answer with actual answer
        if(event.target.textContent === quizQues[currentIndex].a){
            // if answer matches, display "Correct"
            displayAns.children[1].textContent = "Correct!";
            // score increased by 2 for every correct answer
            score += 2;
            points.textContent = score;
        }
        else{
            // if answer does not match, display "Wrong"
           displayAns.children[1].textContent  = "Wrong!";
           // take way 10 secs from remaining time for every incorrect answer per rules
           secondsLeft -= 10;
        }
        // used the setTimeout function to wait for about a second before moving on to the next question
        setTimeout(function(){
            displayAns.children[1].textContent  = ""; 
            // goes to the next index in the quizQues array
            currentIndex++;
            if(currentIndex < quizQues.length){
                displayQues(quizQues[currentIndex]);
            } else {
                // hides the question page
                questionRow.classList.add("hide");
                // unhides the user initials/final score page after all 5 questions are done
                initialsPg.classList.remove("hide");
                finalScore.textContent = score;
            }
        },1500);  
    };
})

//Add event listeners 
   // to the Submit button when user enters the initials to submit
   // to the Clear-Highscores button when user clicks on it to delete all the existing highscores
   // to the Take-Quiz-again button to return back to main page to restart the quiz
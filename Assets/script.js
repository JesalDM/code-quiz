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
const submitBtn = document.querySelector("#submit");
const initialsInput = document.querySelector("#initials");
const takeQuizBtn = document.querySelector("#go-back");
const finalPg = document.querySelector(".final-pg");
const tBody = document.querySelector("tBody");
const clearHiScoreBtn = document.querySelector("#clear");

// Object that holds the quiz questions, multi-choice options and the answers.
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
     opt: ["function myFunction()", "function: myFunction()", "function = myFunction()", "myFunction()"]},
    {q: "4) How does a FOR loop start?",
     a: "for(var i = 0; i <= 5; i++)",
     opt: ["for(var i = 0; i <= 5)", "for(var i = 0; i <= 5; i++)", "for var i = 1 to 5", "for(i <=5; i++)"]}, 
    {q: "5) How do you find the minimum of x and y using Javascript?",
     a: "Math.min(x,y)",
     opt: ["min(x,y)", "Math.floor(x,y)", "math.Min(x,y)", "Math.min(x,y)"]}
]

// Initialize the index, score and time variables
let currentIndex = 0;
let secondsLeft = 150;
let score = 0;

/*Create and append elements*/

// Creates and appends the div to display the answer on the questions page
const div = document.createElement('div');
displayAns.appendChild(div);

// Creates and appends the (li)s for displaying the options using a loop. Also, adds event listener to these options when user hovers over them.
for (let i = 0; i < quizQues[0].opt.length; i++){
   const li = document.createElement('li');
   options.appendChild(li);
   li.addEventListener("mouseover", function(){
     this.style.cursor = "pointer";
   });
}

/* Functions*/

// This function handles the time element by setting the time interval and clearing it based on a condition
function setTime(){
    let timer = setInterval(function(){
         secondsLeft--;
         countdown.textContent= secondsLeft;
         // clear the timer if user cannot complete the quiz within 180 secs or when user has completed all teh questions before time
         if(secondsLeft <= 0 || currentIndex===quizQues.length){
             clearInterval(timer);
             gotoInitialsPg();
         }
     },1000);
 }
   
// This function will display the questions and the corresponding multi-choice options to the user using a loop
function displayQues(currQuesObj){
    questions.textContent = currQuesObj.q;
    for (let i = 0; i < currQuesObj.opt.length; i++){
    options.children[i].textContent = currQuesObj.opt[i];
    }
}

// This function will create a row in the View Highscore modal everytime a user takes the quiz and submits the initials
function buildScoreRow(currObj){
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    tBody.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    td1.innerHTML = currObj.name;
    td2.innerHTML = currObj.score;
}

// This function retrieves the highscore list from local storage and builds the UI table within the modal for displaying it to the user
function getHighScores(){
    const highscoreTable = JSON.parse(localStorage.getItem("QuizHighScores"));
    tBody.textContent="";
    highscoreTable.forEach(function(obj){
        buildScoreRow(obj);
    })
}

// This function sorts the array in descending order
function sortHighScores(highscoreArray){
    highscoreArray.sort(function(current, next){
        if (current.score > next.score){
            return -1
        } else if(current.score < next.score){
            return 1
        }
        return 0
    })
}

function gotoInitialsPg(){
    // hides the question page
    questionRow.classList.add("hide");
    // unhides the user initials/final score page after all 5 questions are done
    initialsPg.classList.remove("hide");
    finalScore.textContent = score;
    countdown.textContent=0;
}

/*Event Listeners*/

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
        else {
            // if answer does not match, display "Wrong"
           displayAns.children[1].textContent  = "Wrong!";
           // takes way 10 secs from remaining time for every incorrect answer per rules
           secondsLeft -= 10;
        }
        // waits for about a second before moving on to the next question
        setTimeout(function(){
            displayAns.children[1].textContent  = ""; 
            // goes to the next index in the quizQues array
            currentIndex++;
            if(currentIndex < quizQues.length){
                displayQues(quizQues[currentIndex]);
            } else {
                gotoInitialsPg();
            }
        },1200);  
    };
})

// Added event listener to submit button after user enters his/her initials
submitBtn.addEventListener("click", function(event){
    event.preventDefault();
    // retreives the existing Highscore list from local storage
    const highscoreTable = JSON.parse(localStorage.getItem("QuizHighScores")) || [];
    // create an object to be pushed into the highscoreTable array
    const currScore = {};
    currScore.name = initialsInput.value;
    currScore.score = score;
    // adds the current initials and score as an object in the highscoreTable array
    highscoreTable[highscoreTable.length] = currScore;
    // sorts the highscoreTable list after adding the current score
    sortHighScores(highscoreTable);
    // stores the sorted list in the local storage
    localStorage.setItem("QuizHighScores", JSON.stringify(highscoreTable));
    // handling the score, timer and initials input box values
    score = 0;  
    points.textContent=score; 
    initialsInput.value = "";
    countdown.textContent = 0;
    // unhides the final page with button links to take quiz again and view highscores
    finalPg.classList.remove("hide");
    // hides this page on submit 
    initialsPg.classList.add("hide"); 
})

// Added event listener to 'Take Quiz again' button when user clicks on it
takeQuizBtn.addEventListener("click", function(){
    // resets the currentIndex and secondsleft to be ready for the quiz game again
    currentIndex=0;
    secondsLeft = 180;
    // brings up the welcome page to strat the quiz again
    welcomePg.classList.remove("hide");
    // hides this page
    finalPg.classList.add("hide");
})

// Added event listener to the "Clear Highscores" button when user clicks on it to delete all the existing highscores
clearHiScoreBtn.addEventListener("click", function(){
    // removes the existing list from the UI modal
    tBody.textContent="";
    // removes the existing list from the local storage
    localStorage.removeItem("QuizHighScores");
})

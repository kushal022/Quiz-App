// Select Elements

const userNameDisplay = document.getElementById('userNameDisplay');
const userNameInput = document.getElementById('userNameInput');
const enterBtn = document.getElementById('enterBtn');
const category1 = document.getElementById('cat1');
const category2 = document.getElementById('cat2');
const category3 = document.getElementById('cat3');
const category4 = document.getElementById('cat4');

const categoryDisplay = document.getElementById('categoryDisplay');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');
const questionDispaly = document.getElementById('question');
const nextQuesBtn = document.getElementById('nxtBtn');
const skipBtn = document.getElementById('skipBtn');
const quesNo = document.getElementById('qusNo');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const userNameResult = document.getElementById('userNameResult');
const attemptQus = document.getElementById('attemptQus');
const correctQus = document.getElementById('correctQus');
const wrongQus = document.getElementById('wrongQus');
const percentage = document.getElementById('percentage');
const timeTaken = document.getElementById('timeTaken');
const startAgainBtn = document.getElementById('startAgainBtn');
const goHome = document.getElementById('goHomeBtn');


// Pages Elements
const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');

// Import Questions:
import { questionsObj } from "./ques.js";
// console.log(questions)

// Create variables
let optionsArray = [option1, option2, option3, option4];
let categoryArray = [category1, category2, category3, category4];
let score = 0;
let wrongAns = 0;
let correctAns = 0;
let countQus = 0;
let countOpt = 0;
let countAns = 0;
let userName = '';
let category = '';
let qus = '';
let t = 10;
let interval;
let t0 = 0;
let totalInterval;
// Initialize an array to track skipped questions
let skippedQuestions = [];
let ansClick = false;



// Enter button functionality to get user name
enterBtn.addEventListener('click', function () {
    userName = userNameInput.value;
    userNameDisplay.innerText = `${userName} 😎`;
});

// Category Button Functionality
function selectCat() {
    categoryArray.forEach(cat => {
        cat.addEventListener('click', () => {
            if (userName == '') {
                alert('Please Enter Your Name !! 💡');
            } else {
                qus = cat.value;
                category = cat.textContent;
                homePage.classList.add('hide');
                quizPage.classList.remove('hide');
                categoryDisplay.innerText = category;
                showQuestionOption();
                t0 = 0;
                totalTimer();
            }
        });
    });
};
selectCat();

// Show Question & Option Function:
function showQuestionOption() {
    if (countQus < 10) {
        // print questions:
        questionDispaly.innerText = questionsObj[qus][countQus].question;
        // print options:
        optionsArray.forEach(opt => {
            opt.innerText = questionsObj[qus][countQus].options[countOpt];
            countOpt++;
        });
        quesNo.innerText = countQus + 1;
        if (countQus == 9) {
            nextQuesBtn.innerText = 'See Result';
            skipBtn.disabled = true;
        };
        t = 10;
        timer(countQus);
        countQus++;
        countOpt = 0;
    } else {
        // nextQuesBtn.disabled = true;
    }
};

// function for timer:
function timer(countQus) {
    if (t > 1) {
        interval = setInterval(() => {
            timerDisplay.innerText = t;
            t--;
            if (t < 0) {
                clearInterval(interval);
                showQuestionOption();
                if (!ansClick) {
                    countAns++;
                }
                if (countQus !== 9) {
                    recetOpt();
                } else {
                    optionsArray.forEach(opt => opt.disabled = true)
                }
                console.log('timer off');
            };
        }, 1000);
    }
}

// recet option btns:
function recetOpt() {
    optionsArray.forEach(opt => {
        opt.disabled = false;
        opt.classList.remove('green', 'red')
    });
};

// check answer:
function checkAns() {
    optionsArray.forEach(e => {
        e.addEventListener('click', () => {
            ansClick = true;
            console.log(questionsObj[qus][countAns].answer)
            if (e.textContent == questionsObj[qus][countAns].answer) {
                e.classList.add('green');
                // set score
                score++;
                correctAns++;
                scoreDisplay.innerText = score;
            } else {
                e.classList.add('red');
                //wrong ans
                wrongAns++;
                optionsArray.forEach(d => {
                    d.disabled = true
                    if (d.textContent == questionsObj[qus][countAns].answer) {
                        d.classList.add('green');
                    };
                });
            };
            countAns++;
        });

    });
};
checkAns();

// Next Button Functionality
nextQuesBtn.addEventListener('click', function () {
    clearInterval(interval)
    t = 10;
    if (countQus !== 10) {
        showQuestionOption();
    }
    recetOpt();
    if (countQus == 10) {
        console.log('count Questiona: ', countQus)
        // To Result Page
        nextQuesBtn.addEventListener('click', resultFun)
    }
});


// Skip Button Functionality
function skipFun() {
    skipBtn.addEventListener('click', function () {
        // Track the skipped question
        skippedQuestions.push(questionsObj[qus][countQus].id);
        console.log('Skipped Questions:', skippedQuestions);

        // Move to the next question
        clearInterval(interval);
        t = 10;
        countAns++;
        showQuestionOption();
        // recet options
        recetOpt();
    });
}
skipFun();

//result function:
function resultFun() {
    clearInterval(totalInterval);
    quizPage.classList.add('hide');
    resultPage.classList.remove('hide');
    userNameResult.textContent = userName;
    timeTaken.textContent = t0;
    attemptQus.textContent = (correctAns + wrongAns + skippedQuestions.length);
    correctQus.textContent = correctAns;
    wrongQus.textContent = wrongAns;
    percentage.textContent = (correctAns / 10) * 100 + " %";
};

// Time Taken function:
function totalTimer() {
    totalInterval = setInterval(() => {
        t0++;
        // console.log('total Timer: ', t0)
    }, 1000);
};

// Go to Home Functionality:
goHome.addEventListener('click', () => {
    // Hide the result page and show the home page
    resultPage.classList.add('hide');
    homePage.classList.remove('hide');

    // Initialize/reset variables
    score = 0;
    wrongAns = 0;
    correctAns = 0;
    countQus = 0;
    countOpt = 0;
    countAns = 0;
    userName = '';
    category = '';
    qus = '';
    t = 10;
    clearInterval(interval);
    clearInterval(totalInterval);
    // Reset skipped questions array
    skippedQuestions = [];
    // Option buttons reset
    recetOpt();
    //  reset the display elements
    userNameDisplay.innerText = '';
    scoreDisplay.innerText = '0';
    quesNo.innerText = '0';
    timerDisplay.innerText = '10';
    categoryDisplay.innerText = '';
    // Remove event listener from next btn:
    nextQuesBtn.removeEventListener('click', resultFun);
});

// Start again btn functionality:
startAgainBtn.addEventListener('click', startAgain)

function startAgain() {
    // Initialize/reset variables
    score = 0;
    wrongAns = 0;
    correctAns = 0;
    countQus = 0;
    countOpt = 0;
    countAns = 0;
    skippedQuestions = [];
    t = 10;
    clearInterval(interval);
    clearInterval(totalInterval);
    recetOpt();
    quizPage.classList.remove('hide');
    resultPage.classList.add('hide');
    categoryDisplay.innerText = category;
    showQuestionOption(qus);
    t0 = 0;
    totalTimer();
    nextQuesBtn.removeEventListener('click', resultFun);
    skipBtn.disabled = false;
};
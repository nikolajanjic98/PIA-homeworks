var mydata = JSON.parse(data)

var leaderboardPage = document.getElementById('WrapperLeaderBoard')
var leaderboardDefault = [{name: 'Vladimir Putin', score: 8},
{name: 'Joacim Cans', score: 7},
{name: 'Bruce Lee', score: 10},
{name: 'George Orwell', score: 9},
{name: 'Henry Ford', score: 5},
{name: 'Ingrid Bergman', score: 4},
{name: 'Cleopatra', score: 3},
{name: 'Prince Charles', score: 2},
{name: 'Emile Zatopek', score: 1},
{name: 'Brad Pitt', score: 4},]

var LN1 = document.getElementById('LN-1')
var S1 = document.getElementById('S-1')
var LN2 = document.getElementById('LN-2')
var S2 = document.getElementById('S-2')
var LN3 = document.getElementById('LN-3')
var S3 = document.getElementById('S-3')
var LN4 = document.getElementById('LN-4')
var S4 = document.getElementById('S-4')
var LN5 = document.getElementById('LN-5')
var S5 = document.getElementById('S-5')
var LN6 = document.getElementById('LN-6')
var S6 = document.getElementById('S-6')
var LN7 = document.getElementById('LN-7')
var S7 = document.getElementById('S-7')
var LN8 = document.getElementById('LN-8')
var S8 = document.getElementById('S-8')
var LN9 = document.getElementById('LN-9')
var S9 = document.getElementById('S-9')
var LN10 = document.getElementById('LN-10')
var S10 = document.getElementById('S-10')

var startQuizButton = document.getElementById('startquiz-btn')
startQuizButton.addEventListener('click', startQuiz)

var mainPage = document.getElementById('WrapperStart')
var questionPage = document.getElementById('WrapperQuestions')

var score = document.getElementById('Score')
var timer = document.getElementById('Timer')

var questionTitle = document.getElementById('QuestionId')
var questionType = document.getElementById('QuestionType')

var answer1 = document.getElementById('answer1-btn')
answer1.addEventListener('click', selectAnswer_1)
var answer2 = document.getElementById('answer2-btn')
answer2.addEventListener('click', selectAnswer_2)
var answer3 = document.getElementById('answer3-btn')
answer3.addEventListener('click', selectAnswer_3)
var answer4 = document.getElementById('answer4-btn')
answer4.addEventListener('click', selectAnswer_4)

var answertype1 = document.getElementById('Answers')

var answertype2 = document.getElementById('AnswersType2')
var confirmButton = document.getElementById('confirm-btn')
confirmButton.addEventListener('click', confirmAnswer)

var answerfield = document.getElementById('AnswerField')
var answermissingwarning = document.getElementById('Warning-answermissing')

var namefield = document.getElementById('NameField') 
var namemissingwarning = document.getElementById('Warning-namemissing')

var wronganswertext = document.getElementById('WrongAnswer')
var correctanswertext = document.getElementById('CorrectAnswer')

var nextQuestionButton = document.getElementById('nextquestion-btn')
nextQuestionButton.addEventListener('click', initNextQuestion)

var giveUpButton = document.getElementById('giveup-btn')
giveUpButton.addEventListener('click', giveupandendquiz)

var congratulations = document.getElementById('Congratulations')

let playername = '';
let currentQuestionIndex = 0;
let currentCorrectAnswer = -1;
let answered = false;
let evaluation = false;
// score and timer
let currentScore = 0;
let currentTime = 0;

var quiztimervar

function quizTimerTick()
{
    timer.innerText = 'Time left: ' + currentTime
    if (currentTime <= 0)
    {
        if (evaluation == false)
        {
            currentTime = 5
            evaluation = true
            answered = true
        }
        else
        {
            initNextQuestion()
        }
    }
    currentTime = currentTime - 1
}

function startQuiz()
{
    if(typeof(Storage) !== "undefined") {
        if (localStorage.hasOwnProperty("leaderboard") == false) 
        {
            localStorage.setItem("leaderboard",JSON.stringify(leaderboardDefault))
        }
    }
    
    
    if (namefield.value != '')
    {   
        playername = namefield.value

        namemissingwarning.classList.add('hide') 
        mainPage.classList.add('hide')
        questionPage.classList.remove('hide')

        quiztimervar = setInterval(quizTimerTick, 1000);
        initNextQuestion()
    }
    else
    {
        namemissingwarning.classList.remove('hide')
    }
}

function giveupandendquiz()
{
    currentQuestionIndex = 10
    initNextQuestion()
}

function initNextQuestion()
{
    answered = false
    currentTime = 20

    if (currentQuestionIndex < 10)
    {
        if (currentQuestionIndex < 7)
        {
            // Reset button states
            answer1.classList.remove('btn-success')
            answer1.classList.remove('btn-danger')
            answer1.classList.remove('btn-outline-info')
            answer1.classList.add('btn-outline-info')
    
            answer2.classList.remove('btn-success')
            answer2.classList.remove('btn-danger')
            answer2.classList.remove('btn-outline-info')
            answer2.classList.add('btn-outline-info')
    
            answer3.classList.remove('btn-success')
            answer3.classList.remove('btn-danger')
            answer3.classList.remove('btn-outline-info')
            answer3.classList.add('btn-outline-info')
        
            answer4.classList.remove('btn-success')
            answer4.classList.remove('btn-danger')
            answer4.classList.remove('btn-outline-info')
            answer4.classList.add('btn-outline-info')
        }
        else
        {
            answerfield.value = ''
            correctanswertext.classList.add('hide')
            wronganswertext.classList.add('hide')
            answertype1.classList.add('hide')
            answertype2.classList.remove('hide')
        }

        if (currentQuestionIndex == 9)
        {
            nextQuestionButton.innerText = 'See results...'
        }

        showQuestion(currentQuestionIndex)
    
        currentQuestionIndex = currentQuestionIndex + 1
    }
    else
    {
        congratulations.innerText = 'Thank you for participating ' + playername + '. Your score is ' + currentScore + '!'
        clearTimeout
        showScoreAndLeaderBoard()
    }
    
}

function showQuestion(index)
{
    questionTitle.innerText = mydata[index].question
    if (mydata[index].type == 'SRA')
    {
        questionType.innerText = 'Select right answer.'
        answer1.innerText = mydata[index].answer1
        answer2.innerText = mydata[index].answer2
        answer3.innerText = mydata[index].answer3
        answer4.innerText = mydata[index].answer4
    }
    else if (mydata[index].type == 'FILL')
    {
        questionType.innerText = 'Fill the sentence.'
    }
    else if (mydata[index].type == 'ERN')
    {
        questionType.innerText = 'Enter number.'
    }

    currentCorrectAnswer = mydata[index].Correct
}

function showScoreAndLeaderBoard()
{
    clearInterval(quiztimervar)
    questionPage.classList.add('hide')
    leaderboardPage.classList.remove('hide')

    let leaderboardarray = []

    if(typeof(Storage) !== "undefined") {
        if (localStorage.leaderboard) 
        {
            var existingleaderboard = JSON.parse(localStorage.getItem("leaderboard"))
            for (i = 0; i < 10; i++)
            {
                let newitem = {name: existingleaderboard[i].name, score: existingleaderboard[i].score}
                leaderboardarray.push(newitem)
            }
        }
    }

    let player = {name: playername, score: currentScore}
    leaderboardarray.push(player)

    leaderboardarray.sort((a, b) => (a.name > b.name) ? 1 : -1)
    leaderboardarray.sort(function(a, b){return b.score-a.score});
    
    var index = leaderboardarray.indexOf(leaderboardarray[10]);
    if (index > -1) {
        leaderboardarray.splice(index, 1);
    }

    LN1.innerText = leaderboardarray[0].name
    S1.innerText = leaderboardarray[0].score

    LN2.innerText = leaderboardarray[1].name
    S2.innerText = leaderboardarray[1].score

    LN3.innerText = leaderboardarray[2].name
    S3.innerText = leaderboardarray[2].score

    LN4.innerText = leaderboardarray[3].name
    S4.innerText = leaderboardarray[3].score
    
    LN5.innerText = leaderboardarray[4].name
    S5.innerText = leaderboardarray[4].score

    LN6.innerText = leaderboardarray[5].name
    S6.innerText = leaderboardarray[5].score

    LN7.innerText = leaderboardarray[6].name
    S7.innerText = leaderboardarray[6].score

    LN8.innerText = leaderboardarray[7].name
    S8.innerText = leaderboardarray[7].score

    LN9.innerText = leaderboardarray[8].name
    S9.innerText = leaderboardarray[8].score

    LN10.innerText = leaderboardarray[9].name
    S10.innerText = leaderboardarray[9].score

    localStorage.setItem("leaderboard", JSON.stringify(leaderboardarray));

}

function selectAnswer_1()
{
    if (answered == false)
    {
        if (currentCorrectAnswer == 1)
        {
            answer1.classList.remove('btn-outline-info')
            answer1.classList.add('btn-success')
            currentScore = currentScore + 1
            score.innerText = 'Score: ' + currentScore

        }
        else
        {
            answer1.classList.remove('btn-outline-info')
            answer1.classList.add('btn-danger')
            if (currentCorrectAnswer == 2)
            {
                answer2.classList.remove('btn-outline-info')
                answer2.classList.add('btn-outline-success')
            }
            else if (currentCorrectAnswer == 3)
            {
                answer3.classList.remove('btn-outline-info')
                answer3.classList.add('btn-outline-success')
            }
            else if (currentCorrectAnswer == 4)
            {
                answer4.classList.remove('btn-outline-info')
                answer4.classList.add('btn-outline-success')
            }
        }
        answered = true
        currentTime = 5
        evaluation = true
    }
}

function selectAnswer_2()
{
    if (answered == false)
    {
        if (currentCorrectAnswer == 2)
        {
            answer2.classList.remove('btn-outline-info')
            answer2.classList.add('btn-success')
            currentScore = currentScore + 1
            score.innerText = 'Score: ' + currentScore
        }
        else
        {
            answer2.classList.remove('btn-outline-info')
            answer2.classList.add('btn-danger')
            if (currentCorrectAnswer == 1)
            {
                answer1.classList.remove('btn-outline-info')
                answer1.classList.add('btn-outline-success')
            }
            else if (currentCorrectAnswer == 3)
            {
                answer3.classList.remove('btn-outline-info')
                answer3.classList.add('btn-outline-success')
            }
            else if (currentCorrectAnswer == 4)
            {
                answer4.classList.remove('btn-outline-info')
                answer4.classList.add('btn-outline-success')
            }
        }
        answered = true
        currentTime = 5
        evaluation = true
    }
}

function selectAnswer_3()
{
    if (answered == false)
    {
        if (currentCorrectAnswer == 3)
        {
            answer3.classList.remove('btn-outline-info')
            answer3.classList.add('btn-success')
            currentScore = currentScore + 1
            score.innerText = 'Score: ' + currentScore
        }
        else
        {
            answer3.classList.remove('btn-outline-info')
            answer3.classList.add('btn-danger')
            if (currentCorrectAnswer == 1)
            {
                answer1.classList.remove('btn-outline-info')
                answer1.classList.add('btn-outline-success')
            }
            else if (currentCorrectAnswer == 2)
            {
                answer2.classList.remove('btn-outline-info')
                answer2.classList.add('btn-outline-success')
            }
            else if (currentCorrectAnswer == 4)
            {
                answer4.classList.remove('btn-outline-info')
                answer4.classList.add('btn-outline-success')
            }
        }
        answered = true
        currentTime = 5
        evaluation = true
    }   
}

function selectAnswer_4()
{
    if (answered == false)
    {
        if (currentCorrectAnswer == 4)
        {
            answer4.classList.remove('btn-outline-info')
            answer4.classList.add('btn-success')
            currentScore = currentScore + 1
            score.innerText = 'Score: ' + currentScore
        }
        else
        {
            answer4.classList.remove('btn-outline-info')
            answer4.classList.add('btn-danger')
            if (currentCorrectAnswer == 1)
            {
                answer1.classList.remove('btn-outline-info')
                answer1.classList.add('btn-outline-success')
            }
            else if (currentCorrectAnswer == 2)
            {
                answer2.classList.remove('btn-outline-info')
                answer2.classList.add('btn-outline-success')
            }
            else if (currentCorrectAnswer == 3)
            {
                answer3.classList.remove('btn-outline-info')
                answer3.classList.add('btn-outline-success')
            }
        }
        answered = true
        currentTime = 5
        evaluation = true
    }
}

function confirmAnswer()
{
    if (answerfield.value != '')
    {   
        if (answered == false)
        {
            answermissingwarning.classList.add('hide')
            if (answerfield.value.toLowerCase() == currentCorrectAnswer.toLowerCase())
            {
                correctanswertext.innerText = 'Correct!'
                correctanswertext.classList.remove('hide')
                currentScore = currentScore + 1
                score.innerText = 'Score: ' + currentScore
            }
            else
            {
                wronganswertext.innerText = 'Wrong! Correct answer is: ' + currentCorrectAnswer
                wronganswertext.classList.remove('hide')
            }
            currentTime = 5
            answered = true
            evaluation = true
        } 
    }
    else
    {
        answermissingwarning.classList.remove('hide')
    }
}
var mydata = JSON.parse(data);

const startQuizButton = document.getElementById('startquiz-btn')
startQuizButton.addEventListener('click', startQuiz)

const mainPage = document.getElementById('WrapperStart')
const questionPage = document.getElementById('WrapperQuestions')

const score = document.getElementById('Score')
const timer = document.getElementById('Timer')

const questionTitle = document.getElementById('QuestionId')
const questionType = document.getElementById('QuestionType')

const answer1 = document.getElementById('answer1-btn')
answer1.addEventListener('click', selectAnswer_1)
const answer2 = document.getElementById('answer2-btn')
answer2.addEventListener('click', selectAnswer_2)
const answer3 = document.getElementById('answer3-btn')
answer3.addEventListener('click', selectAnswer_3)
const answer4 = document.getElementById('answer4-btn')
answer4.addEventListener('click', selectAnswer_4)

const answertype1 = document.getElementById('Answers')

const answertype2 = document.getElementById('AnswersType2')
const confirmButton = document.getElementById('confirm-btn')
confirmButton.addEventListener('click', confirmAnswer)

const answerfield = document.getElementById('AnswerField')
const answermissingwarning = document.getElementById('Warning-answermissing')

const namefield = document.getElementById('NameField') 
const namemissingwarning = document.getElementById('Warning-namemissing')

const wronganswertext = document.getElementById('WrongAnswer')
const correctanswertext = document.getElementById('CorrectAnswer')

const nextQuestionButton = document.getElementById('nextquestion-btn')
nextQuestionButton.addEventListener('click', initNextQuestion)

var playername = ''
var currentQuestionIndex = 0
var currentCorrectAnswer = -1
var answered = false
var evaluation = false
// score and timer
var currentScore = 0
var currentTime = 0

var quiztimervar

function quizTimerTick()
{
    timer.innerText = 'Time left: ' + currentTime
    currentTime = currentTime - 1
    if (currentTime <= 0)
    {
        if (evaluation == false)
        {
            currentTime = 5
            evaluation = true
        }
        else
        {
            initNextQuestion()
        }
    }
}

function startQuiz()
{
    
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

function initNextQuestion()
{
    answered = false
    currentTime = 20

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
    showQuestion(currentQuestionIndex)

    currentQuestionIndex = currentQuestionIndex + 1
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
    else if (mydata[index].type == 'ERA')
    {
        questionType.innerText = 'Enter right answer.'
    }

    currentCorrectAnswer = mydata[index].Correct
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
    }
}

function confirmAnswer()
{
    if (answerfield.value != '')
    {   
        if (answered == false)
        {
            answermissingwarning.classList.add('hide')
            if (answerfield.value == currentCorrectAnswer)
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
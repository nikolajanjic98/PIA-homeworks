const startQuizButton = document.getElementById('startquiz-btn')
startQuizButton.addEventListener('click', startQuiz)

const mainPage = document.getElementById('WrapperStart')
const questionPage = document.getElementById('WrapperQuestions')

const questionTitle = document.getElementById('QuestionId')
const questionType = document.getElementById('QuestionType')

var currentQuestionIndex = 0



const questions = [
    {
        question: 'Really really really really really really really really really long question name test',
        type: 'Select the right answer',
        answers: [
            { text: 'answer 1', correct: true},
            { text: 'answer 2', correct: false}
        ]
    }
]



function startQuiz()
{
    console.log('Quiz started')
    mainPage.classList.add('hide')
    questionPage.classList.remove('hide')

    initNextQuestion(0);
}

function initNextQuestion()
{
    showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question)
{
    questionTitle.innerText = question.question
    questionType.innerText = question.type
}

function selectAnswer()
{

}
const questions = [
    {
        question: "What is the main function of a computer's CPU?",
        answers: [
            { text: "Storing data", correct: false },
            { text: "Displaying images", correct: false },
            { text: "Processing information", correct: true },
            { text: "Connecting to the internet", correct: false },
        ],
    },
    {
        question: "What is the value of 7 x 8?",
        answers: [
            { text: "56", correct: true },
            { text: "64", correct: false },
            { text: "49", correct: false },
            { text: "42", correct: false },
        ],
    },
    {
        question: "Which gas do plants absorb from the air during photosynthesis?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Hydrogen", correct: false },
        ],
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Beijing", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Seoul", correct: false },
            { text: "Bangkok", correct: false },
        ],
    },
    {
        question: "Who founded the search engine google",
        answers: [
            { text: "satya nadela", correct: false },
            { text: "larry page and sergy brin", correct: true },
            { text: "sundar pichai", correct: false },
            { text: "sam altman", correct: false },
        ],
    },
    {
        question: "Who is famous for leading the Civil Rights Movement in the United States?",
        answers: [
            { text: "Martin Luther King Jr.", correct: true },
            { text: "Rosa Parks", correct: false },
            { text: "Malcolm X", correct: false },
            { text: "Abraham Lincoln", correct: false },
        ],
    },
    {
        question: "In which sport would you perform a slam dunk?",
        answers: [
            { text: "Soccer", correct: false },
            { text: "Basketball", correct: true },
            { text: "Tennis", correct: false },
            { text: "Golf", correct: false },
        ],
    },
    {
        question: "Who was the first President of the United States?",
        answers: [
            { text: "Thomas Jefferson", correct: false },
            { text: "Abraham Lincoln", correct: false },
            { text: "George Washington", correct: true },
            { text: "John Adams", correct: false },
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Indian Ocean", correct: false },
            { text: "Atlantic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false },
        ],
    },
    {
        question: "What is the name of the woodwind instrument that is played by blowing into a reed?",
        answers: [
            { text: "Flute", correct: false },
            { text: "Clarinet", correct: false },
            { text: "Trumpet", correct: true },
            { text: "Saxophone", correct: false },
        ],
    },
    {
        question: "What is the capital of Australia?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Melbourne", correct: false },
            { text: "Canberra", correct: true },
            { text: "Brisbane", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
        ],
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false },
        ],
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            { text: "Oxygen", correct: true },
            { text: "Gold", correct: false },
            { text: "Osmium", correct: false },
            { text: "Fluorine", correct: false },
        ],
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Hippopotamus", correct: false },
        ],
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Claude Monet", correct: false },
        ],
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.querySelector(".progress-bar");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    progressBar.style.width = "0"; // Reset progress bar width
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    // Update progress bar width based on the number of questions answered
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    nextButton.style.display = "block";
}

function showscore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handlenextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showscore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handlenextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

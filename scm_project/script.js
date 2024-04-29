document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.querySelector(".login-container");
    const quizContainer = document.querySelector(".quiz-container");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login-button");
    const question = document.getElementById("question");
    const choices = document.getElementById("choices");
    const nextButton = document.getElementById("next-button");
    const result = document.getElementById("result");
    const timer = document.getElementById("timer");
    const timeLeft = document.getElementById("time-left");

    // Define quiz questions and answers
    const quizData = [
        {
            question: "Q1. Ministry of Road Transport and Highways of India is under:",
            choices: ["Dharmendra Pradhan", "Rajnath Singh", "Nitin Gadkari", "Amit Shah"],
            correctAnswer: "Nitin Gadkari"
        },
        {
            question: "Q2. Who is the chairman of ISRO?",
            choices: ["Rahul Gandhi", "S. Somnath", "Dr. K. Sivan", "Ajit Doval"],
            correctAnswer: "S. Somnath"
        },
        {
            question: "Q3. In which year did India win its first Cricket World Cup?",
            choices: ["1980", "1983", "1990", "1995"],
            correctAnswer: "1983"
        },
        {
            question: "Q4. Who served as the first Indian Chief of Defence Staff (CDS)?",
            choices: ["Bipin Rawat", "Anil Chauhan", "Vikram Batra", "Abhinandan Vardhaman"],
            correctAnswer: "Bipin Rawat"
        },
        {
            question: "Q5. What is the capital of France?",
            choices: ["Madrid", "Rome", "Paris", "Berlin"],
            correctAnswer: "Paris"
        },
        {
            question: "Q6. Who wrote 'To Kill a Mockingbird'?",
            choices: ["Harper Lee", "J.K. Rowling", "George Orwell", "Ernest Hemingway"],
            correctAnswer: "Harper Lee"
        }
        // Add more questions as needed
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;

    function loadQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        question.textContent = currentQuestion.question;
        const choicesContainer = document.getElementById("choices");
        choicesContainer.innerHTML = "";
    
        currentQuestion.choices.forEach(choice => {
            const div = document.createElement("div");
            div.className = "choice-box";
            div.textContent = choice;
            div.onclick = () => checkAnswer(choice); // Call checkAnswer on click
            choicesContainer.appendChild(div);
        });
    }
    
    function checkAnswer(userAnswer) {
        const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
        const choiceBoxes = document.querySelectorAll(".choice-box");
    
        // Disable further clicks on all choices
        choiceBoxes.forEach(box => {
            box.onclick = null;
        });
    
        // Highlight the correct and incorrect choices
        choiceBoxes.forEach(box => {
            if (box.textContent === userAnswer) {
                if (userAnswer !== correctAnswer) {
                    box.style.backgroundColor = "#f44336"; // Red for wrong answer
                } else {
                    box.style.backgroundColor = "#4caf50"; // Green for correct answer
                }
            } else if (box.textContent === correctAnswer) {
                box.style.backgroundColor = "#4caf50"; // Green for correct answer
            }
        });
    
        // Show the next button
        const nextButton = document.getElementById("next-button");
        nextButton.style.display = "block";
    
        // Update the score
        if (userAnswer === correctAnswer) {
            score++;
        }
    }
    function loadNextQuestion() {
        // Clear result message
        const resultElement = document.getElementById("result");
        resultElement.textContent = "";
    
        // Enable choices for the next question
        const choiceBoxes = document.querySelectorAll(".choice-box");
        choiceBoxes.forEach(box => (box.onclick = () => checkAnswer(box.textContent)));
    
        // Hide the next button
        const nextButton = document.getElementById("next-button");
        nextButton.style.display = "none";
    
        // Move to the next question
        currentQuestionIndex++;
    
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }
    
    function showResult() {
        question.textContent = `Quiz completed! Your score: ${score} out of ${quizData.length}`;
        choices.innerHTML = "";
        nextButton.style.display = "none";
        clearInterval(timerInterval); // Stop the timer
    }

    function startTimer() {
        let timeLimit = 120; // Set the time limit in seconds
        timeLeft.textContent = timeLimit;

        timerInterval = setInterval(() => {
            if (timeLimit > 0) {
                timeLimit--;
                timeLeft.textContent = timeLimit;
            } else {
                showResult();
            }
        }, 1000);
    }
    nextButton.addEventListener("click", loadNextQuestion);
    // Add event listener to login button
    loginButton.addEventListener("click", () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Perform authentication here (e.g., check username and password)
        // For simplicity, you can use a hardcoded username and password for now
        if (username === "1234" && password === "1234") {
            loginContainer.style.display = "none";
            quizContainer.style.display = "block";
            loadQuestion();
            startTimer();
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
});

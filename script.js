document.addEventListener("DOMContentLoaded", function() {
    const loginContainer = document.querySelector(".login-container");
    const quizContainer = document.querySelector(".quiz-container");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login-button");
    const question = document.getElementById("question");
    const choices = document.getElementById("choices");
    const submitButton = document.getElementById("submit-button");
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
            choices: ["Rahul Gandhi", "S.Somnath", "Dr.K.Sivan", "Ajit Doval"],
            correctAnswer: "S.Somnath"
        },
        {
            question: "Q3. In which year did India win its first Cricket World Cup?",
            choices: ["1980", "1983", "1990", "1995"],
            correctAnswer: "1983"
        },
        {
            question: "Q4. Who served as first Indian Chief of Defence Staff (CDS)?",
            choices: ["Bipin Rawat", "Anil Chauhan", "Vikram Batra", "Abhinandan Vardhaman"],
            correctAnswer: "Bipin Rawat"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;

    function loadQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        question.textContent = currentQuestion.question;
        choices.innerHTML = "";

        currentQuestion.choices.forEach(function(choice) {
            const li = document.createElement("li");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "choice";
            radio.value = choice;
            li.appendChild(radio);
            li.appendChild(document.createTextNode(choice));
            choices.appendChild(li);
        });
    }

    function checkAnswer() {
        const selectedChoice = document.querySelector("input[name='choice']:checked");
        if (!selectedChoice) {
            return;
        }

        const userAnswer = selectedChoice.value;
        const correctAnswer = quizData[currentQuestionIndex].correctAnswer;

        if (userAnswer === correctAnswer) {
            score++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }
    submitButton.addEventListener("click", checkAnswer);
    function showResult() {
        question.textContent = `Quiz completed! Your score: ${score} out of ${quizData.length}`;
        choices.innerHTML = "";
        submitButton.style.display = "none";
        clearInterval(timerInterval); // Stop the timer
    }

    function startTimer() {
        let timeLimit = 60; // Set the time limit in seconds
        timeLeft.textContent = timeLimit;

        timerInterval = setInterval(function() {
            if (timeLimit > 0) {
                timeLimit--;
                timeLeft.textContent = timeLimit;
            } else {
                showResult();
            }
        }, 1000);
    }

    // Add event listener to login button
    loginButton.addEventListener("click", function() {
        // Perform authentication here (e.g., check username and password)
        const username = usernameInput.value;
        const password = passwordInput.value;

        // For simplicity, you can use a hardcoded username and password for now
        if (username === "user" && password === "password") {
            loginContainer.style.display = "none";
            quizContainer.style.display = "block";
            loadQuestion();
            startTimer();
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
});

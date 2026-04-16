// ---------------- SIGNUP ----------------
function signup() {
  let name = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;

  let user = { name, email, password };

  localStorage.setItem("user", JSON.stringify(user));

  Swal.fire("Success", "Account Created!", "success");

  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

// ---------------- LOGIN ----------------
function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email === email && user.password === password) {
    Swal.fire("Success", "Login Successful!", "success");

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    document.getElementById("welcome").innerText = "Welcome " + user.name;

  } else {
    Swal.fire("Error", "Invalid Email or Password", "error");
  }
}

// ---------------- QUIZ DATA ----------------
let questions = [
  {
    q: "What does JS stand for?",
    options: ["JavaStyle", "JavaScript", "JustScript", "None"],
    answer: 1
  },
  {
    q: "Which symbol is used for comments?",
    options: ["//", "##", "**", "%%"],
    answer: 0
  },
  {
    q: "Which company created JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Apple"],
    answer: 1
  }
];

let index = 0;
let score = 0;

// ---------------- START QUIZ ----------------
function startQuiz() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("quizBox").style.display = "block";

  loadQuestion();
}

// ---------------- LOAD QUESTION ----------------
function loadQuestion() {
  document.getElementById("question").innerText = questions[index].q;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  questions[index].options.forEach((opt, i) => {
    optionsDiv.innerHTML += `
      <div>
        <input type="radio" name="opt" value="${i}"> ${opt}
      </div>
    `;
  });
}

// ---------------- NEXT QUESTION ----------------
function nextQuestion() {
  let selected = document.querySelector('input[name="opt"]:checked');

  if (!selected) {
    Swal.fire("Warning", "Please select an option", "warning");
    return;
  }

  if (parseInt(selected.value) === questions[index].answer) {
    score++;
  }

  index++;

  if (index < questions.length) {
    loadQuestion();
  } else {
    Swal.fire(
      "Quiz Finished 🎉",
      `Total: ${questions.length} | Correct: ${score} | Score: ${score}`,
      "success"
    );

    // reset
    index = 0;
    score = 0;
  }
}
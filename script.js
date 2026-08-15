// =========================
// ELEMENTS
// =========================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const togglePassword = document.getElementById("togglePassword");

const loginButton = document.getElementById("loginButton");
const successMessage = document.getElementById("successMessage");


// =========================
// PASSWORD VISIBILITY
// =========================

togglePassword.addEventListener("click", () => {

  const isPassword = passwordInput.type === "password";

  passwordInput.type = isPassword ? "text" : "password";

  togglePassword.textContent = isPassword ? "🙈" : "👁";

  togglePassword.setAttribute(
    "aria-label",
    isPassword ? "Hide password" : "Show password"
  );

});


// =========================
// EMAIL VALIDATION
// =========================

function validateEmail(email) {

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);

}


// =========================
// DISPLAY ERROR
// =========================

function showError(input, errorElement, message) {

  const inputBox = input.closest(".input-box");

  inputBox.classList.add("error");

  errorElement.textContent = message;

}


// =========================
// CLEAR ERROR
// =========================

function clearError(input, errorElement) {

  const inputBox = input.closest(".input-box");

  inputBox.classList.remove("error");

  errorElement.textContent = "";

}


// =========================
// REMOVE ERROR WHILE TYPING
// =========================

emailInput.addEventListener("input", () => {

  clearError(emailInput, emailError);

  successMessage.classList.remove("show");

});

passwordInput.addEventListener("input", () => {

  clearError(passwordInput, passwordError);

  successMessage.classList.remove("show");

});


// =========================
// LOGIN
// =========================

loginForm.addEventListener("submit", (event) => {

  event.preventDefault();

  let isValid = true;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();


  clearError(emailInput, emailError);
  clearError(passwordInput, passwordError);

  successMessage.classList.remove("show");


  // EMAIL VALIDATION
  if (email === "") {

    showError(
      emailInput,
      emailError,
      "Please enter your student email."
    );

    isValid = false;

  } else if (!validateEmail(email)) {

    showError(
      emailInput,
      emailError,
      "Please enter a valid email address."
    );

    isValid = false;

  }


  // PASSWORD VALIDATION
  if (password === "") {

    showError(
      passwordInput,
      passwordError,
      "Please enter your password."
    );

    isValid = false;

  } else if (password.length < 6) {

    showError(
      passwordInput,
      passwordError,
      "Password must contain at least 6 characters."
    );

    isValid = false;

  }


  if (!isValid) {
    return;
  }


  // =========================
  // LOGIN ANIMATION
  // =========================

  loginButton.classList.add("loading");
  loginButton.disabled = true;


  setTimeout(() => {

    // Demo student login information
    localStorage.setItem("studentLoggedIn", "true");
    localStorage.setItem("studentEmail", email);
    localStorage.setItem("studentName", "Alex Johnson");

    successMessage.classList.add("show");

    setTimeout(() => {

      window.location.href = "dashboard.html";

    }, 600);

  }, 1200);

});
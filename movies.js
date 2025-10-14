// Validation
const form = document.getElementById("subscribeForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const errorMsg = document.getElementById("errorMsg");
if (form) {
 form.addEventListener("submit", function (e) {
 e.preventDefault();
 errorMsg.textContent = "";
 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!email.value.match(emailPattern)) {
 errorMsg.textContent = "Please enter a valid email address.";
 return;
 }
 if (password.value.length < 6) {
 errorMsg.textContent = "Password must be at least 6 characters.";
 return;
 }
 if (password.value !== confirmPassword.value) {
 errorMsg.textContent = "Passwords do not match.";
 return;
 }
 alert("Form submitted successfully!");
 form.reset();
 });
}
//Accordion
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(q => {
 q.addEventListener("click", () => {
 const parent = q.parentElement;
 parent.classList.toggle("active");
 });
});
//Popup + Form Validation
const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");
const popupForm = document.getElementById("popupForm");
const subscribeForm = document.getElementById("subscribeForm");
openPopup.addEventListener("click", () => {
 popupForm.style.display = "block";
});
closePopup.addEventListener("click", () => {
 popupForm.style.display = "none";
});
window.addEventListener("click", (e) => {
 if (e.target === popupForm) popupForm.style.display = "none";
});
subscribeForm.addEventListener("submit", (e) => {
 e.preventDefault();
 let email = document.getElementById("email").value.trim();
 let password = document.getElementById("password").value;
 let confirmPassword = document.getElementById("confirmPassword").value;
 let emailError = document.getElementById("emailError");
 let passwordError = document.getElementById("passwordError");
 let confirmError = document.getElementById("confirmError");
 emailError.textContent = "";
 passwordError.textContent = "";
 confirmError.textContent = "";
 let valid = true;
 if (email === "" || !email.includes("@") || !email.includes(".")) {
 emailError.textContent = "Enter a valid email.";
 valid = false;
 }
 if (password.length < 6) {
 passwordError.textContent = "Password must be at least 6 characters.";
 valid = false;
 }
 if (confirmPassword !== password) {
 confirmError.textContent = "Passwords do not match.";
 valid = false;
 }
 if (valid) {
 alert("Subscription successful!");
 popupForm.style.display = "none";
 subscribeForm.reset();
 }
});
// Change Background Color
const colorBtn = document.getElementById("colorBtn");
const colors = ["#967BB6", "#ffb6c1", "#ffd580", "#b3ecff", "#c6ffb3",
"#fff0b3", "#e6b3ff"];
let i = 0;
if (colorBtn) {
 colorBtn.addEventListener("click", () => {
 document.body.style.backgroundColor = colors[i];
 i = (i + 1) % colors.length;
 });
}
// Display Current Date and Time
const dateTimeDisplay = document.getElementById("dateTime");
function updateDateTime() {
 const now = new Date();
 const options = {
 month: "long", day: "numeric", year: "numeric",
 hour: "2-digit", minute: "2-digit", second: "2-digit"
 };
 dateTimeDisplay.textContent = now.toLocaleString("en-US", options);
}
setInterval(updateDateTime, 1000);
updateDateTime();
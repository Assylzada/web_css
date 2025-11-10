// Switch between Sign Up and Log In
function showLogin() {
  document.getElementById("signupBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}

function showSignup() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("signupBox").classList.remove("hidden");
}

// ---------------------------
// 📘 Sign Up Function
// ---------------------------
function signUp() {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  // ✅ Validation Rules
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  if (!name || !email || !password) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("❌ Please enter a valid email address (e.g., user@example.com).");
    return;
  }

  if (!passwordPattern.test(password)) {
    alert(
      "❌ Password must be at least 8 characters long, include at least one uppercase letter and one number."
    );
    return;
  }

  // ✅ Save user to localStorage
  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));

  alert("✅ Account created successfully! Please log in now.");
  showLogin();
}

// ---------------------------
// 🔐 Log In Function
// ---------------------------
function logIn() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("⚠️ No account found. Please sign up first.");
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    alert("✅ Login successful!");
    window.location.href = "willy.html";
  } else {
    alert("❌ Invalid email or password.");
  }
}

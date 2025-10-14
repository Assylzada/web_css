document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Stop form submission for validation

    const fullName = document.getElementById("fullName").value.trim();
    const passport = document.getElementById("passport").value.trim();
    const email = document.getElementById("email").value.trim();
    const testDate = document.getElementById("test_date").value;
    const city = document.getElementById("city").value;

    // Create message dynamically if not in HTML
    let message = document.getElementById("message");
    if (!message) {
      message = document.createElement("div");
      message.id = "message";
      document.getElementById("registerForm").appendChild(message);
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const passportPattern = /^[A-Z]{2}[0-9]{4,6}$/; 

    message.textContent = "";
    message.className = "";

    if (!fullName || !passport || !email || !city) {
      message.textContent = "❌ Please fill in all required fields.";
      message.className = "error";
    } else if (!email.match(emailPattern)) {
      message.textContent = "❌ Invalid email format.";
      message.className = "error";
    } else if (!passport.match(passportPattern)) {
      message.textContent = "❌ Ticket number must start with 2 letters followed by 4–6 digits (e.g., AB1234).";
      message.className = "error";
    } else {
      message.textContent = "✅ Registration successful!";
      message.className = "success";
    } 
  });

  // Accordion Q&A
  const questions = document.querySelectorAll('.question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
  });

  // ✅ Popup logic (moved in correct order)
  const popup = document.getElementById('popup');
  const openPopup = document.getElementById('openPopup');
  const closeBtn = document.querySelector('.close-btn');
  const popupForm = document.getElementById('popupForm');

  openPopup.addEventListener('click', () => popup.style.display = 'flex');
  closeBtn.addEventListener('click', () => popup.style.display = 'none');
  popup.addEventListener('click', e => {
    if (e.target === popup) popup.style.display = 'none';
  });

  popupForm.addEventListener('submit', e => {
    e.preventDefault();
    popup.style.display = 'none';   // Close popup
    popupForm.reset();              // Clear input
    alert("✅ Subscription successful!");
  });

  // Background color changer
  const gradients = [
    ["#a974ff", "#311044", "#1a0b2e"], 
    ["#ffb6c1", "#ff7aa2", "#d63384"],
    ["#ffd580", "#ffb347", "#ff7e5f"], 
    ["#89f7fe", "#66a6ff", "#4b0082"], 
  ];
  let index = 0;
  document.getElementById("colorBtn").addEventListener("click", () => {
    index = (index + 1) % gradients.length;
    const [light, mid, dark] = gradients[index];
    document.body.style.background = `radial-gradient(circle at 30% 30%, ${light}, ${mid}, ${dark})`;
  });

  // Date & time updater
  function updateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric',
                      hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('datetime').textContent = now.toLocaleString('en-US', options);
  }
  setInterval(updateTime, 1000);
  updateTime();
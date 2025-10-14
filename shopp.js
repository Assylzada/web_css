    // ===== Accordion =====
    const questions = document.querySelectorAll('.question');
    questions.forEach(q => {
      q.addEventListener('click', () => {
        const answer = q.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
      });
    });

    // ===== Color Changer =====
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

    // ===== Live Date & Time =====
    function updateTime() {
      const now = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit', second: '2-digit' };
      document.getElementById('datetime').textContent = now.toLocaleString('en-US', options);
    }
    setInterval(updateTime, 1000);
    updateTime();

    // ===== Checkout Validation =====
    document.getElementById("checkoutForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const product = document.getElementById("product").value.trim();
      const quantity = document.getElementById("quantity").value;
      const address = document.getElementById("address").value.trim();
      const message = document.getElementById("message");

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

      message.textContent = "";
      message.className = "";

      if (!name || !email || !product || !quantity || !address) {
        message.textContent = "❌ Please fill in all required fields.";
        message.style.color = "red";
      } else if (!email.match(emailPattern)) {
        message.textContent = "❌ Invalid email format.";
        message.style.color = "red";
      } else {
        message.textContent = "✅ Order placed successfully!";
        message.style.color = "limegreen";
      }
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
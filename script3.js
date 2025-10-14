document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      // Remove previous errors
      document.querySelectorAll(".error-text").forEach(e => e.remove());
      let isValid = true;

      function showError(input, msg) {
        const error = document.createElement("p");
        error.className = "error-text";
        error.textContent = msg;
        input.insertAdjacentElement("afterend", error);
      }

      // ✅ FIX 1: logical operator "||" instead of missing operator
      if (!name.value || name.value.trim() === "") {
        showError(name, "The Oompa-Loompas need your name!");
        isValid = false;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // ✅ FIX 2: same issue here — need "||"
      if (!email.value || email.value.trim() === "") {
        showError(email, "Don’t forget your magical email!");
        isValid = false;
      } else if (!emailPattern.test(email.value.trim())) {
        showError(email, "That email doesn’t look quite right!");
        isValid = false;
      }

      // Message validation
      if (!message.value || message.value.trim().length < 5) {
        showError(message, "Your message needs more sweetness (at least 5 characters)!");
        isValid = false;
      }

      if (isValid) {
        alert("Golden Ticket sent successfully!");
        form.reset();
      }
    });
  }

  // ===== FAQ Accordion =====
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((q) => {
    const answer = q.nextElementSibling;
    if (answer && answer.classList.contains("faq-answer")) {
      answer.style.maxHeight = "0";
    }

    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      q.classList.toggle("active");
      if (!answer) return;

      if (answer.style.maxHeight && answer.style.maxHeight !== "0px") {
        answer.style.maxHeight = "0";
        answer.style.paddingTop = "0";
        answer.style.paddingBottom = "0";
      } else {
        answer.style.paddingTop = "10px";
        answer.style.paddingBottom = "10px";
        answer.style.maxHeight = answer.scrollHeight + 20 + "px";
      }
    });
  });

  // ===== Popup Subscribe =====
  const openBtn = document.getElementById("openSubscribe");
  const overlay = document.getElementById("subscribeOverlay");
  const closeBtn = document.getElementById("closeSubscribe");
  const popupForm = document.getElementById("subscribeForm");
  const popupEmail = document.getElementById("popupEmail");

  if (overlay) {
    if (openBtn) {
      openBtn.addEventListener("click", () => {
        overlay.classList.remove("hidden");
        setTimeout(() => {
          if (popupEmail) popupEmail.focus();
        }, 100);
      });
    }

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.add("hidden");
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        overlay.classList.add("hidden");
      });
    }

    // ✅ FIX 3: removed stray "> barbie:" — that line breaks the entire script!
    // Handle subscribe form submission
    if (popupForm) {
      popupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        popupForm.querySelectorAll(".error-text").forEach(x => x.remove());
        let ok = true;

        const val = popupEmail ? popupEmail.value.trim() : "";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!val) {
          const err = document.createElement("p");
          err.className = "error-text";
          err.textContent = "Please enter your email.";
          popupEmail.insertAdjacentElement("afterend", err);
          ok = false;
        } else if (!emailPattern.test(val)) {
          const err = document.createElement("p");
          err.className = "error-text";
          err.textContent = "Please enter a valid email address.";
          popupEmail.insertAdjacentElement("afterend", err);
          ok = false;
        }

        if (ok) {
          alert("You’ve joined the sweetest list in the world!");
          overlay.classList.add("hidden");
          popupForm.reset();
        }
      });
    }
  }

  // ===== Background color changer =====
  const changeBgBtn = document.getElementById("changeBgBtn");
  const colors = ["#8266a7", "#ffd43b", "#ff9a3c", "#a04fff", "#8be0c8", "#ff7ab6"];
  let colorIndex = 0;
  const pageGrid = document.querySelector(".page-grid");

  if (changeBgBtn && pageGrid) {
    changeBgBtn.addEventListener("click", () => {
      colorIndex = (colorIndex + 1) % colors.length;
      pageGrid.style.transition = "background 0.5s";
      pageGrid.style.background = colors[colorIndex];
    });
  }

  // ===== Live clock =====
  const nowText = document.getElementById("nowText");
  function updateTime() {
    const now = new Date();
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    };
    const formatted = now.toLocaleString("en-US", options);
    if (nowText) nowText.textContent = formatted;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // ===== Escape key closes everything =====
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (overlay && !overlay.classList.contains("hidden")) {
        overlay.classList.add("hidden");
      }
      document.querySelectorAll(".faq-answer").forEach(a => {
        a.style.maxHeight = "0";
        a.style.paddingTop = "0";
        a.style.paddingBottom = "0";
      });
      document.querySelectorAll(".faq-question.active").forEach(q => q.classList.remove("active"));
    }
  });
});

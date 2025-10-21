
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      // remove previous errors
      document.querySelectorAll(".error-text").forEach(e => e.remove());

      let isValid = true;

      function showError(input, msg) {
        const error = document.createElement("p");
        error.className = "error-text";
        error.textContent = msg;
        input.insertAdjacentElement("afterend", error);
      }

      // Name validation
      if (!name.value || name.value.trim() === "") {
        showError(name, "The Oompa-Loompas need your name!");
        isValid = false;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
        // Simulate successful submission
        alert("Golden Ticket sent successfully!");
        form.reset();
      }
    });
  }

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
        // currently open -> close
        answer.style.maxHeight = "0";
        // optionally collapse padding:
        answer.style.paddingTop = "0";
        answer.style.paddingBottom = "0";
      } else {
  
        answer.style.paddingTop = "10px";
        answer.style.paddingBottom = "10px";
        answer.style.maxHeight = answer.scrollHeight + 20 + "px"; 
      }
    });
  });

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
      if (e.target === overlay) {
        overlay.classList.add("hidden");
      }
    });

    // close by close button
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        overlay.classList.add("hidden");
      });
    }

    // handle subscribe form submission with simple validation
    if (popupForm) {
      popupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // remove previous errors inside popup
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

  // --- Rating Stars ---
  const stars = document.querySelectorAll(".star");
  const ratingMessage = document.getElementById("ratingMessage");
  let currentRating = 0;

  stars.forEach(star => {
    star.addEventListener("mouseover", () => {
      stars.forEach(s => s.classList.remove("highlight"));
      const value = parseInt(star.dataset.value);
      for (let i = 0; i < value; i++) {
        stars[i].classList.add("highlight");
      }
    });

    star.addEventListener("mouseout", () => {
      stars.forEach(s => s.classList.remove("highlight"));
    });

    star.addEventListener("click", () => {
      currentRating = parseInt(star.dataset.value);
      stars.forEach((s, i) => {
        if (i < currentRating) s.classList.add("selected");
        else s.classList.remove("selected");
      });

      // Update text dynamically
      if (ratingMessage) {
        ratingMessage.textContent = `You rated Willy Wonka’s World ${currentRating} ${currentRating === 1 ? 'star' : 'stars'}! 🍫`;
      }
    });
  });

  // --- Theme Toggle (Day/Night Switch) ---
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("night-mode");

      if (body.classList.contains("night-mode")) {
        themeToggle.textContent = "Switch to Day Mode ☀️";
      } else {
        themeToggle.textContent = "Switch to Night Mode 🌙";
      }
    });
  }

   // --- Wonka Random Fact Generator ---
  const factArea = document.querySelector("#factArea");
  const factButton = document.querySelector("#factButton");
  const factList = document.querySelectorAll("#factList p");

  if (factButton && factArea && factList.length > 0) {
    factButton.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * factList.length);
      const randomFact = factList[randomIndex].textContent;

      factArea.style.opacity = 0;
      setTimeout(() => {
        factArea.textContent = randomFact;
        factArea.style.opacity = 1;
      }, 200);
    });
  }

  // time
  const showTimeBtn = document.getElementById("showTimeBtn");
  const timeDisplay = document.getElementById("timeDisplay");

  if (showTimeBtn && timeDisplay) {
    showTimeBtn.addEventListener("click", () => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString();
      timeDisplay.textContent = currentTime;

      timeDisplay.style.opacity = 0;
      setTimeout(() => {
        timeDisplay.style.opacity = 1;
      }, 100);
    });
  }


    // --- Keyboard Navigation for Menu ---
  const navItems = document.querySelectorAll(".nav-item");
  let currentIndex = 0;

  if (navItems.length > 0) {
    navItems[currentIndex].focus();

    document.addEventListener("keydown", (event) => {
      if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          currentIndex = (currentIndex + 1) % navItems.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          currentIndex = (currentIndex - 1 + navItems.length) % navItems.length;
        }

        navItems[currentIndex].focus();
      }
    });
  }

  //Multiform
  const multiForm = document.getElementById("multiStepForm");
  if (!multiForm) return;

  const steps = multiForm.querySelectorAll(".form-step");
  let currentStep = 0;

  const showStep = (index) => {
    steps.forEach((step, i) => {
      step.classList.toggle("active-step", i === index);
    });
  };

  const updateReview = () => {
    document.getElementById("reviewName").textContent = document.getElementById("crewName").value;
    document.getElementById("reviewAge").textContent = document.getElementById("crewAge").value;
    document.getElementById("reviewSweet").textContent = document.getElementById("favoriteSweet").value;
    document.getElementById("reviewRole").textContent = document.getElementById("dreamRole").value;
  };

  multiForm.addEventListener("click", (e) => {
    if (e.target.classList.contains("next-btn")) {
      e.preventDefault();
      if (currentStep < steps.length - 1) {
        if (currentStep === 1) updateReview();
        currentStep++;
        showStep(currentStep);
      }
    }

    if (e.target.classList.contains("back-btn")) {
      e.preventDefault();
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }
  });
 
  multiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("🎉 Welcome to the Wonka Factory Crew! 🍫");
    multiForm.reset();
    currentStep = 0;
    showStep(currentStep);
  });

  // Greeting message
  const greetingEl = document.getElementById("greetingMessage");
  if (!greetingEl) return;

  const hours = new Date().getHours();
  let greetingText = "";

  if (hours < 12) {
    greetingText = "Good morning, chocolate dreamer! ☀️";
  } else if (hours < 18) {
    greetingText = "Good afternoon, golden ticket seeker! 🍫";
  } else {
    greetingText = "Good evening, sweet adventurer! 🌙";
  }

  greetingEl.textContent = greetingText;


  // --- Play Magical Sound (Sidebar) ---
  const soundButton = document.getElementById("soundButton");
  const wonkaSound = document.getElementById("wonkaSound");

  if (soundButton && wonkaSound) {
    soundButton.addEventListener("click", () => {
      wonkaSound.currentTime = 0;
      wonkaSound.play();
    });
  }

  // 🍫 запускаем бесконечное вращение
  magicSound.classList.add("spin-forever");
});

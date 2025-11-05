$(document).ready(function() {
  console.log("jQuery is ready!");
});
document.addEventListener("DOMContentLoaded", () => {
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
  const colors = ["#967BB6", "#ffb6c1", "#ffd580", "#b3ecff", "#c6ffb3", "#fff0b3", "#e6b3ff"];
  let i = 0;

  if (colorBtn) {
    colorBtn.addEventListener("click", () => {
      document.body.style.backgroundColor = colors[i];
      i = (i + 1) % colors.length;
    });
  }

  
  const stars = document.querySelectorAll(".star-rating .star");
  const ratingResult = document.getElementById("ratingResult");

  if (stars.length > 0) {
    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const value = parseInt(star.getAttribute("data-value"));

        // Сбрасываем выделение
        stars.forEach(s => s.classList.remove("selected"));

        // Подсвечиваем выбранные звезды
        for (let i = 0; i < value; i++) {
          stars[i].classList.add("selected");
        }

        ratingResult.textContent = `You rated ${value} out of 5 ⭐`;
      });
    });
  }

  // Dynamic Text Change using textContent and innerHTML
  const messageBtn = document.getElementById("messageBtn");
  const wonkaMessage = document.getElementById("wonkaMessage");

  if (messageBtn && wonkaMessage) {
    messageBtn.addEventListener("click", () => {
      // changing text with textContent
      wonkaMessage.textContent = "✨ You’ve unlocked Willy Wonka’s golden message! ✨";

      setTimeout(() => {
        wonkaMessage.innerHTML = "Keep dreaming, chocolate lover 🍫";
      }, 3000);
    });
  }

  // Show Current Time using new Date().toLocaleTimeString()
  const showTimeBtn = document.getElementById("showTimeBtn");
  const timeDisplay = document.getElementById("timeDisplay");

  if (showTimeBtn && timeDisplay) {
    showTimeBtn.addEventListener("click", () => {
      const currentTime = new Date().toLocaleTimeString();
      timeDisplay.textContent = `${currentTime}`;
    });
  }

    
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

  
  const steps = document.querySelectorAll(".form-step");
  const nextBtns = document.querySelectorAll(".nextBtn");
  const backBtns = document.querySelectorAll(".backBtn");
  const multiForm = document.getElementById("wonkaForm");
  let currentStep = 0;

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === stepIndex);
    });
  }

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  backBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  multiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Your Golden Ticket request has been submitted!");
    multiForm.reset();
    currentStep = 0;
    showStep(currentStep);
  });


  
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

  
  $("#gallerySearch").on("keyup", function() {
    let value = $(this).val().toLowerCase();

    $(".gallery-item").filter(function() {
      $(this).toggle(
        $(this).text().toLowerCase().includes(value) ||
        $(this).find("img").attr("alt").toLowerCase().includes(value)
      );
    });
  });

  const questions = [];
  $(".faq-question").each(function () {
    questions.push($(this).text());
  });

  
  $("#faqSearch").on("keyup", function () {
    const query = $(this).val().toLowerCase();
    $("#suggestions").empty();

    if (query.length === 0) {
      removeHighlights();
      $(".faq-item").show();
      return;
    }

    const matches = questions.filter(q => q.toLowerCase().includes(query));
    matches.forEach(match => {
      $("#suggestions").append(`<li>${match}</li>`);
    });

    filterFAQ(query);
    highlightMatches(query);
  });

  
  $(document).on("click", "#suggestions li", function () {
    const text = $(this).text();
    $("#faqSearch").val(text);
    $("#suggestions").empty();

    filterFAQ(text.toLowerCase());
    highlightMatches(text.toLowerCase());
  });

  
  function filterFAQ(query) {
    $(".faq-item").each(function () {
      const q = $(this).find(".faq-question").text().toLowerCase();
      const a = $(this).find(".faq-answer").text().toLowerCase();
      $(this).toggle(q.includes(query) || a.includes(query));
    });
  }

  
  function highlightMatches(query) {
    removeHighlights();
    if (!query) return;

    const regex = new RegExp(`(${query})`, "gi");

    $(".faq-question, .faq-answer").each(function () {
      const text = $(this).text();
      const newHtml = text.replace(regex, '<span class="highlight">$1</span>');
      $(this).html(newHtml);
    });
  }

 
  function removeHighlights() {
    $(".highlight").each(function () {
      $(this).replaceWith($(this).text());
    });
  }

  
  document.addEventListener("scroll", function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById("scrollBar").style.width = scrollPercent + "%";
  });


  
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      themeToggle.textContent = 
        document.body.classList.contains("dark-mode") ? "🌙 Night Mode" : "☀️ Light Mode";
    });
  }

  
  const modal = document.getElementById("movieModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const closeBtn = document.querySelector(".close");

  const movieInfo = {
    "1971 Classic": "The 1971 film 'Willy Wonka & the Chocolate Factory' stars Gene Wilder and remains a timeless classic.",
    "2005 Adaptation": "Tim Burton’s 2005 version features Johnny Depp as a quirky, darker Willy Wonka.",
    "2023 Prequel": "The 2023 film 'Wonka' with Timothée Chalamet explores the young inventor’s early adventures."
  };

  document.querySelectorAll(".card .btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const title = e.target.previousElementSibling.previousElementSibling.textContent;
      modalTitle.textContent = title;
      modalText.textContent = movieInfo[title];
      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });



  const clickSound = new Audio("cartoon-button-click-sound.mp3");
  clickSound.volume = 0.4; // громкость от 0 до 1

 
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      // Перематываем, чтобы звук всегда играл с начала
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });


});


$(document).ready(function () {
  console.log("jQuery is ready!");
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const submitBtn = form.querySelector(".btn");

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
        // 🌀 Task 6: Loading Spinner on Submit
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span class="spinner"></span> Please wait...`;

        // Симуляция "отправки на сервер"
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          form.reset();

          //Task 7: Show Notification after success
          showNotification("🎉 Golden Ticket sent successfully!");
        }, 2500);
      }
    });
  }

  // 🪄 Task 7: Notification System

  function showNotification(message) {
    const container = document.getElementById("notification-container");

    // Создаём блок уведомления
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;

    container.appendChild(notification);

    // Удаляем после исчезновения
    setTimeout(() => {
      notification.remove();
    }, 4000);
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



  //Real time search
  const searchInput = document.getElementById("wonkaSearch");
  const figures = document.querySelectorAll(".gallery figure");

  searchInput.addEventListener("keyup", function() {
    const value = searchInput.value.toLowerCase().trim();

    figures.forEach(function(fig) {
      const caption = fig.textContent.toLowerCase();
      if (caption.includes(value) || value === "") {
        fig.style.display = "inline-block";
      } else {
        fig.style.display = "none";
      }
    });
  });

  //Autocomplete Search Suggestions 
  const questions = [];
    $(".faq-question").each(function () {
      questions.push($(this).text());
    });

    $("#faqSearch").on("keyup", function () {
      const query = $(this).val().toLowerCase();
      $("#suggestions").empty();

      if (query.length === 0) return;

      const matches = questions.filter(q => q.toLowerCase().includes(query));

      matches.forEach(match => {
        $("#suggestions").append(`<li>${match}</li>`);
      });
    });

    // Когда кликаем на подсказку — заполняем поле и фильтруем FAQ
    $(document).on("click", "#suggestions li", function () {
      const text = $(this).text();
      $("#faqSearch").val(text);
      $("#suggestions").empty();

      $(".faq-item").each(function () {
        const q = $(this).find(".faq-question").text().toLowerCase();
        $(this).toggle(q.includes(text.toLowerCase()));
      });
    });

    // При вводе — фильтруем FAQ в реальном времени
    $("#faqSearch").on("input", function () {
      const val = $(this).val().toLowerCase();
      $(".faq-item").each(function () {
        const q = $(this).find(".faq-question").text().toLowerCase();
        $(this).toggle(q.includes(val));
      });
    });

// Search Highlighting for FAQ section
  const faqSearch = document.getElementById("faqSearch");
  const faqItems = document.querySelectorAll(".faq-item");

  faqSearch.addEventListener("keyup", function() {
    const keyword = faqSearch.value.trim();
    const regex = new RegExp(`(${keyword})`, "gi");

    faqItems.forEach(item => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");

      // Remove previous highlights
      question.innerHTML = question.textContent;
      answer.innerHTML = answer.textContent;

      // Apply new highlights if keyword exists
      if (keyword !== "") {
        question.innerHTML = question.textContent.replace(regex, "<mark>$1</mark>");
        answer.innerHTML = answer.textContent.replace(regex, "<mark>$1</mark>");
      }
    });
  });

 // Colorful Scroll Progress Bar 
  document.addEventListener("scroll", function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById("scrollBar").style.width = scrollPercent + "%";
  });


  // Animated Number Counter
  const counters = document.querySelectorAll('.count');
  const speed = 150; // скорость анимации

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = target / speed;

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Запуск анимации при появлении в зоне видимости
  const sidebar = document.querySelector('.sidebar-counter');
  if (sidebar) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    });
    observer.observe(sidebar);
}


    $(document).ready(function () {
    const tooltip = $('#copy-tooltip');

    $('.copy-btn').on('click', function () {
      const card = $(this).closest('.card');
      const textToCopy = `${card.find('h3').text()} - ${card.find('p').text()}`;

      // Create a temporary hidden textarea for copying
      const temp = $('<textarea>');
      $('body').append(temp);
      temp.val(textToCopy).select();
      document.execCommand('copy');
      temp.remove();

      // Trigger a custom copy event
      $(this).trigger('copy');
    });

    // When copy event happens
    $('.copy-btn').on('copy', function () {
      const btn = $(this);
      const originalText = btn.text();

      // Change button text
      btn.text('✓ Copied');

      // Show tooltip
      tooltip.addClass('show');

      // Restore button and hide tooltip
      setTimeout(() => {
        btn.text(originalText);
        tooltip.removeClass('show');
      }, 1500);
    });
  });


  //Lazy Loading Images
  function lazyLoadImages() {
    $(".lazy-img").each(function () {
      const img = $(this);
      if (img.attr("src")) return; // уже загружена

      const windowBottom = $(window).scrollTop() + $(window).height();
      const imgTop = img.offset().top;

      // Когда картинка появляется в зоне видимости
      if (windowBottom > imgTop - 100) {
        const realSrc = img.attr("data-src");
        img.attr("src", realSrc);
        img.hide().fadeIn(600); 
      }
    });
  }

  // При загрузке и при прокрутке
  $(window).on("scroll", lazyLoadImages);
  lazyLoadImages();

  //Functional Buttons ===
  const modal = $('#productModal');
  const modalTitle = $('#modalTitle');
  const modalDescription = $('#modalDescription');

  $('.card .btn:not(.copy-btn)').on('click', function () {
    const title = $(this).siblings('h3').text();
    const desc = $(this).siblings('p').text();
    modalTitle.text(title);
    modalDescription.text(desc);
    modal.removeClass('hidden');
  });

  $('#closeModal').on('click', () => modal.addClass('hidden'));


  $('#subscribeForm').on('submit', function (e) {
    e.preventDefault();
    const email = $('#popupEmail').val().trim();

    if (email === '' || !email.includes('@')) {
      alert('Please enter a valid email!');
    } else {
      alert('Subscribed successfully! 🎉');
      $('#subscribeOverlay').addClass('hidden');
      this.reset();
    }
  });


  $('.next-btn').on('click', function () {
    const currentStep = $(this).closest('.form-step');
    const inputs = currentStep.find('input');
    let valid = true;

    inputs.each(function () {
      if (!$(this).val().trim()) {
        valid = false;
        $(this).css('border', '2px solid red');
      } else {
        $(this).css('border', '');
      }
    });

    if (valid) {
      const nextStep = currentStep.next('.form-step');
      currentStep.removeClass('active-step');
      nextStep.addClass('active-step');
    } else {
      alert('Please complete all fields before continuing!');
    }
  });

  //Light/Night Mode 
  const themeToggle = document.getElementById("themeToggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  // Audio
  const clickSound = new Audio("cartoon-button-click-sound.mp3");
  clickSound.volume = 0.4; 

  
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });

  

});
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



  

  /* ===============================
   🍭 WONKA DOM + EVENT INTERACTIONS
   =============================== */

// ⭐ 1. Star Rating
const stars = document.querySelectorAll('.star');
const ratingMsg = document.querySelector('#ratingMessage');

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    stars.forEach((s, i) => s.classList.toggle('active', i <= index));
    ratingMsg.textContent = `You rated ${index + 1}/5 stars — scrumdiddlyumptious! 🍫`;
  });
});

// 🌞 2. Theme Toggle
const toggleBtn = document.querySelector('#themeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  toggleBtn.textContent = document.body.classList.contains('light-mode')
    ? '🌙 Switch to Night'
    : '🌞 Switch to Day';
});

// 🍬 3. Random Wonka Quote
const quotes = [
  "A little nonsense now and then is relished by the wisest men.",
  "So shines a good deed in a weary world.",
  "We are the music makers, and we are the dreamers of dreams.",
  "If you want to view paradise, simply look around and view it.",
  "Time is a precious thing. Never waste it."
];
const quoteBtn = document.querySelector('#quoteBtn');
const quoteArea = document.querySelector('#quoteArea');

quoteBtn.addEventListener('click', () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteArea.style.opacity = 0;
  setTimeout(() => {
    quoteArea.textContent = `"${randomQuote}"`;
    quoteArea.style.opacity = 1;
  }, 200);
});

// 🍭 4. Product Filter (Switch Statement)
const categorySelect = document.querySelector('#categorySelect');
const products = document.querySelectorAll('#productContainer .product-card');

categorySelect.addEventListener('change', (e) => {
  const category = e.target.value;
  products.forEach(prod => {
    switch (category) {
      case 'chocolate':
      case 'candy':
      case 'gum':
        prod.classList.toggle('hide', prod.dataset.category !== category);
        break;
      default:
        prod.classList.remove('hide');
    }
  });
});



// 🍬 Full-Page Keyboard Navigation for Menu
const menu = document.getElementById("mainMenu");
const menuLinks = menu.querySelectorAll("a");
let currentIndex = 0;

// Allow links to be focusable
menuLinks.forEach(link => link.setAttribute("tabindex", "0"));

// Highlight & focus current menu item
function focusMenuItem(index) {
  menuLinks.forEach(link => link.classList.remove("active"));
  const activeLink = menuLinks[index];
  activeLink.classList.add("active");
  activeLink.focus();
}

// Listen globally (on entire page)
document.addEventListener("keydown", (event) => {
  const key = event.key;

  switch (key) {
    case "ArrowRight":
      event.preventDefault();
      currentIndex = (currentIndex + 1) % menuLinks.length;
      focusMenuItem(currentIndex);
      break;

    case "ArrowLeft":
      event.preventDefault();
      currentIndex = (currentIndex - 1 + menuLinks.length) % menuLinks.length;
      focusMenuItem(currentIndex);
      break;

    case "Enter":
      // Simulate clicking the focused link
      event.preventDefault();
      menuLinks[currentIndex].click();
      break;
  }
});



document.getElementById('confettiBtn').addEventListener('click', () => {
  const container = document.getElementById('confettiContainer');
  const sound = document.getElementById('confettiSound');

  // 🎵 Play sound
  sound.currentTime = 0;
  sound.play();

  // 🎉 Generate confetti
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    // Random position, color & animation
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${Math.random() * 10}%`;
    confetti.style.background = `hsl(${Math.random() * 60 + 40}, 100%, 60%)`;
    confetti.style.animationDuration = `${Math.random() * 1 + 1}s`;
    confetti.style.animationDelay = `${Math.random() * 0.3}s`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
  }
});




const moreItems = [
  { src: "photo/giraffe.png", caption: "Macaroon" },
  { src: "photo/mint.png", caption: "Mint Bar" },
  { src: "photo/hair.png", caption: "Hair Repair Eclair" },
  { src: "photo/wonk.png", caption: "Wonka" },
  { src: "photo/bar.png", caption: "Wonka Bar" },
  { src: "photo/cup.png", caption: "Cupcakes" },
  { src: "photo/cake.png", caption: "Chocolate Cake" },
  { src: "photo/cookies.png", caption: "Cookies" },
  { src: "photo/cake2.png", caption: "White Chocolate Cake" }
];

document.getElementById('loadMoreBtn').addEventListener('click', () => {
  const container = document.getElementById('galleryContainer');
  const btn = document.getElementById('loadMoreBtn');

  btn.textContent = 'Loading... 🍬';
  btn.disabled = true;

  setTimeout(() => {
    moreItems.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('gallery-item');
      div.innerHTML = `
        <img src="${item.src}" alt="">
        <div class="caption">${item.caption}</div>
      `;
      div.style.opacity = 0;
      container.appendChild(div);

      // fade-in 
      setTimeout(() => (div.style.transition = 'opacity 0.5s', div.style.opacity = 1), 100);
    });

    btn.textContent = '✨ All Loaded';
  }, 1000);
});



const form = document.getElementById('registerForm');
const steps = document.querySelectorAll('.form-step');
const successMsg = document.getElementById('successMsg');
let currentStep = 0;

function showStep(step) {
  steps.forEach((el, i) => {
    el.classList.toggle('active', i === step);
  });
}

form.addEventListener('click', (e) => {
  if (e.target.classList.contains('next')) {
    const inputs = steps[currentStep].querySelectorAll('input, select');
    for (let input of inputs) {
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
    }
    currentStep = Math.min(currentStep + 1, steps.length - 1);
    showStep(currentStep);
  }

  if (e.target.classList.contains('back')) {
    currentStep = Math.max(currentStep - 1, 0);
    showStep(currentStep);
  }
});




// Task 0: Setup & test
$(document).ready(function () {
  console.log("🍭 jQuery is ready for Willy Wonka’s Magical Factory!");

  /* ------------------------------------------------------
   * Part 1 — jQuery Search Features
   * ------------------------------------------------------ */

  // Task 1: Real-time search in the shop
  // Add a search bar dynamically at the top of the shop

  $("#shopSearch").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    $("#shop .product").filter(function () {
      $(this).toggle($(this).text().toLowerCase().includes(value));
    });
  });

  // Task 2: Autocomplete suggestions (based on product names)
  const productNames = [];
  $("#shop .shop-item strong").each(function () {
    productNames.push($(this).text());
  });

  const $suggestList = $('<ul id="suggestList" class="suggestion-box"></ul>').insertAfter("#shopSearch");

  $("#shopSearch").on("keyup", function () {
    const query = $(this).val().toLowerCase();
    $suggestList.empty();
    if (query) {
      const matches = productNames.filter((n) => n.toLowerCase().includes(query));
      matches.forEach((match) => {
        $suggestList.append(`<li>${match}</li>`);
      });
    }
  });

  $(document).on("click", "#suggestList li", function () {
    $("#shopSearch").val($(this).text());
    $suggestList.empty();
  });

  // Task 3: Highlight search term in FAQ accordion
  $(".accordion").prepend('<input type="text" id="faqSearch" placeholder="🔍 Search FAQ..." style="width:100%;padding:8px;margin-bottom:10px;">');

  $("#faqSearch").on("keyup", function () {
    const term = $(this).val();
    $(".answer, .question").each(function () {
      const originalText = $(this).text();
      if (term) {
        const regex = new RegExp(`(${term})`, "gi");
        const highlighted = originalText.replace(regex, '<span class="highlight">$1</span>');
        $(this).html(highlighted);
      } else {
        $(this).text(originalText);
      }
    });
  });


  /* ------------------------------------------------------
   * Part 2 — UX Engagement
   * ------------------------------------------------------ */

  // Task 4: Scroll progress bar
  $("body").prepend('<div id="scrollBar"></div>');
  $(window).on("scroll", function () {
    const scroll = $(this).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrolled = (scroll / docHeight) * 100;
    $("#scrollBar").css("width", scrolled + "%");
  });

  // Task 5: Animated counter — show random factory stats

  $(".counter").each(function () {
    const $this = $(this);
    const target = +$this.attr("data-target");
    $({ countNum: 0 }).animate(
      { countNum: target },
      {
        duration: 2500,
        easing: "swing",
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(target + "+");
        },
      }
    );
  });
  // Task 6: Loading spinner on the Golden Ticket form submit
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();

    const $submit = $(this).find("button[type='submit']:visible");

    if ($submit.length === 0) {
      console.warn("Submit button not found or not visible");
      return;
    }

    const originalHTML = $submit.html();
    $submit.prop("disabled", true).html('<span class="spinner"></span> Please wait...');

    // simulate processing delay
    setTimeout(() => {
      $("#successMsg").removeClass("hidden").fadeIn(400);
      $submit.prop("disabled", false).html(originalHTML);
    }, 2000);
  });

  /* ------------------------------------------------------
   * Part 3 — Web App Functionality Enhancements
   * ------------------------------------------------------ */

  // Task 7: Toast Notification when user subscribes
  $("#popupForm").on("submit", function (e) {
    e.preventDefault();
    $("body").append('<div id="toast">🎉 Subscription successful!</div>');
    $("#toast").fadeIn();
    setTimeout(() => $("#toast").fadeOut(() => $("#toast").remove()), 2500);
  });

  // Task 8: Copy to Clipboard — copy shop price
  $("#shop .price").each(function (index) {
    const $btn = $(`<button class="copyBtn" style="margin-left:5px;">📋 Copy</button>`);
    $(this).after($btn);
  });

  $(document).on("click", ".copyBtn", function () {
    const text = $(this).prev(".price").text();
    navigator.clipboard.writeText(text);
    $(this).text("✔ Copied!");
    const $btn = $(this);
    setTimeout(() => $btn.text("📋 Copy"), 1500);
  });

  // Task 9: Lazy load gallery images
  $("img").each(function () {
    const src = $(this).attr("src");
    $(this).attr("data-src", src);
    $(this).removeAttr("src");
  });

  $(window).on("scroll", function () {
    $("img[data-src]").each(function () {
      const top = $(this).offset().top;
      const scrollBottom = $(window).scrollTop() + $(window).height();
      if (scrollBottom > top) {
        $(this).attr("src", $(this).attr("data-src")).removeAttr("data-src");
      }
    });
  });
});

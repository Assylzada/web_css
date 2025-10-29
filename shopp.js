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
    document.getElementById('showTimeBtn').addEventListener('click', () => {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const timeBox = document.getElementById('datetime');
    timeBox.textContent = `🕒 ${formatted}`;
    timeBox.style.opacity = 0;
    setTimeout(() => (timeBox.style.opacity = 1), 50); // плавное появление
  });

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




// 🍫 Fake + real products
const products = [
  {
    img: "photo/silver.png",
    name: "Silver Lightning",
    price: 12,
    desc: "Rich dark chocolate with a liquid caramel heart infused with sea salt.",
    category: "chocolate"
  },
  {
    img: "photo/bignightout.png",
    name: "Big Night Out Candy",
    price: 9,
    desc: "Milk chocolate studded with popping candy and freeze-dried raspberries.",
    category: "candy"
  },
  {
    img: "photo/bar.png",
    name: "Wonka Cocoa Box",
    price: 26,
    desc: "A bar of chocolate — espresso, hazelnut, orange blossom and more.",
    category: "chocolate"
  },
  {
    img: "photo/mint.png",
    name: "Wonka Mint Candy",
    price: 9,
    desc: "Milk chocolate studded with popping candy and mint.",
    category: "candy"
  },
  {
    img: "photo/hair.png",
    name: "Wonka Hair Repair Chocolate",
    price: 13,
    desc: "Dark chocolate eclair with popping candy and raspberries.",
    category: "chocolate"
  },
  {
    img: "photo/bar.png",
    name: "Wonka Forty Second Candy",
    price: 29,
    desc: "White chocolate with popping red candies and decorations.",
    category: "limited"
  }
];

// 🎁 Additional products
const extraProducts = [
  {
    img: "https://shopsuki.ph/cdn/shop/files/107905363_1024x.png?v=1694507096",
    name: "Crystal Cream Bar",
    price: 11,
    desc: "Silky white chocolate with vanilla bean and honeycomb crunch.",
    category: "chocolate"
  },
  {
    img: "https://www.shutterstock.com/image-photo/front-view-single-chocolate-ball-600nw-2116750058.jpg",
    name: "Golden Truffle Sphere",
    price: 16,
    desc: "Rich ganache truffle coated in edible gold dust — a true treasure.",
    category: "limited"
  },
  {
    img: "https://joyfoodsunshine.com/wp-content/uploads/2022/06/homemade-caramel-recipe-5.jpg",
    name: "Caramel Cascade",
    price: 14,
    desc: "Milk chocolate shell filled with molten caramel and sea salt flakes.",
    category: "chocolate"
  },
  {
    img: "https://ifoodreal.com/wp-content/uploads/2024/05/fg-chocolate-berry-bars.jpg",
    name: "Berry Burst Bar",
    price: 10,
    desc: "Dark chocolate infused with blueberries, raspberries, and popping candy.",
    category: "candy"
  },
  {
    img: "https://cdn11.bigcommerce.com/s-3h7bc216oq/images/stencil/2000x2000/products/162/466/mwmarbleslab__83279.1588203436.jpg?c=2",
    name: "Marble Mirage",
    price: 20,
    desc: "Swirled white and milk chocolate with hazelnut praline layers.",
    category: "premium"
  },
  {
    img: "https://m.media-amazon.com/images/I/61mkqatF49L._SL1000_.jpg",
    name: "Whimsical Lollipop",
    price: 7,
    desc: "Colorful spiral lollipop with fizzy center — a child’s dream come true.",
    category: "candy"
  }
];

const shopContainer = document.getElementById("shop");
const filterSelect = document.getElementById("filter");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let displayedProducts = [...products];

function renderProducts(list) {
  shopContainer.innerHTML = ""; 
  list.forEach(p => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="meta">
        <div class="name">${p.name}</div>
        <div class="price">$${p.price}</div>
      </div>
      <p class="desc">${p.desc}</p>
      <button class="btn-primary">Buy — $${p.price}</button>
    `;
    shopContainer.appendChild(card);
  });
}

filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;
  const filtered = value === "all"
    ? displayedProducts
    : displayedProducts.filter(p => p.category === value);
  renderProducts(filtered);
});

loadMoreBtn.addEventListener("click", () => {
  displayedProducts = [...displayedProducts, ...extraProducts];
  renderProducts(displayedProducts);
  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = "All Products Loaded 🎉";
});

renderProducts(displayedProducts);


// 🌞 2. Theme Toggle
const toggleBtn = document.querySelector('#themeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
  toggleBtn.textContent = document.body.classList.contains('night-mode')
    ? '🌙 Switch to Day'
    : '🌞 Switch to Night';
});


// 🎹 Keyboard navigation for nav menu
const navLinks = document.querySelectorAll('.nav-links a');

document.addEventListener('keydown', (e) => {
  const focusIndex = Array.from(navLinks).findIndex(link => link === document.activeElement);

  switch (e.key) {
    case 'ArrowRight':
      e.preventDefault();
      if (focusIndex === -1 || focusIndex === navLinks.length - 1) {
        navLinks[0].focus(); // go to first
      } else {
        navLinks[focusIndex + 1].focus();
      }
      break;

    case 'ArrowLeft':
      e.preventDefault();
      if (focusIndex <= 0) {
        navLinks[navLinks.length - 1].focus(); // wrap to last
      } else {
        navLinks[focusIndex - 1].focus();
      }
      break;

    case 'Enter':
      if (document.activeElement.tagName === 'A') {
        document.activeElement.click(); // open the link
      }
      break;
  }
});



const steps = document.querySelectorAll('.form-step');
  const form = document.getElementById('checkoutForm');
  let currentStep = 0;

  const showStep = (index) => {
    steps.forEach((step, i) => step.classList.toggle('active', i === index));
  };

  // NEXT
  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  // BACK
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  // SUBMIT (final step)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('message').textContent = "✅ Order successfully placed!";
    form.reset();
    currentStep = 0;
    showStep(currentStep);
  });

// ⭐ 1. Star Rating
const stars = document.querySelectorAll('.star');
const ratingMsg = document.querySelector('#ratingMessage');

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    stars.forEach((s, i) => s.classList.toggle('active', i <= index));
    ratingMsg.textContent = `You rated ${index + 1}/5 stars — scrumdiddlyumptious! 🍫`;
  });
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



$(document).ready(function () {
  console.log("✅ jQuery is ready!");

  /* ------------------------------------
     🧩 1. Real-Time Product Search + Filter
  ------------------------------------ */
  // Add a live search bar above products
  $(".filter-bar").after(`
    <div class="search-wrapper">
      <input type="text" id="searchInput" placeholder="🔍 Search chocolates or candies..." />
      <ul id="autoSuggestions" class="suggestions-list"></ul>
    </div>
  `);

  const productNames = $(".card .name")
    .map(function () {
      return $(this).text().trim();
    })
    .get();

  // Real-time search filtering
  $("#searchInput").on("keyup", function () {
    const keyword = $(this).val().toLowerCase();
    $(".card").each(function () {
      const match = $(this).text().toLowerCase().includes(keyword);
      $(this).toggle(match);
    });

    // Autocomplete suggestions
    const matched = productNames.filter((n) =>
      n.toLowerCase().includes(keyword)
    );
    const suggestions = matched
      .slice(0, 5)
      .map((n) => `<li>${n}</li>`)
      .join("");
    $("#autoSuggestions").html(suggestions || "");
  });

  // Click suggestion → autofill
  $(document).on("click", "#autoSuggestions li", function () {
    $("#searchInput").val($(this).text());
    $("#autoSuggestions").empty();
    $("#searchInput").trigger("keyup");
  });

  /* ------------------------------------
     💡 2. Search Highlighting
  ------------------------------------ */
  $("#searchInput").on("input", function () {
    const term = $(this).val().trim();
    $(".desc").each(function () {
      const text = $(this).text();
      if (term) {
        const regex = new RegExp(`(${term})`, "gi");
        const highlighted = text.replace(regex, "<mark>$1</mark>");
        $(this).html(highlighted);
      } else {
        $(this).text(text);
      }
    });
  });

  /* ------------------------------------
     🧭 3. Scroll Progress Bar
  ------------------------------------ */
  $("body").append(`
    <div id="scrollProgress"><div id="scrollBar"></div></div>
  `);

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const percent = (scrollTop / docHeight) * 100;
    $("#scrollBar").css("width", percent + "%");
  });

  /* ------------------------------------
     🔢 4. Animated Number Counter
  ------------------------------------ */
  $(".best-items").before(`<div id="counter" class="counter">0 users 🍫</div>`);
  let num = 0;
  const target = 1000;
  const step = 25;
  const interval = setInterval(() => {
    num += step;
    $("#counter").text(`${num}+ users 🍫`);
    if (num >= target) clearInterval(interval);
  }, 40);

  /* ------------------------------------
     ⏳ 5. Loading Spinner on Submit
  ------------------------------------ */
  $("#checkoutForm").on("submit", function (e) {
    e.preventDefault();
    const btn = $(this).find("button[type='submit']");
    btn.prop("disabled", true).html(`<span class="spinner"></span> Please wait…`);

    setTimeout(() => {
      btn.prop("disabled", false).text("Place Order");
      showToast("✅ Order placed successfully!");
    }, 1800);
  });

  /* ------------------------------------
     🔔 6. Toast Notification System
  ------------------------------------ */
  function showToast(message) {
    const toast = $(`<div class="toast">${message}</div>`);
    $("body").append(toast);
    setTimeout(() => toast.addClass("show"), 100);
    setTimeout(() => toast.removeClass("show"), 3000);
    setTimeout(() => toast.remove(), 3500);
  }

  $(".btn-primary").on("click", function (e) {
    e.preventDefault();
    showToast("🍬 Item added to cart!");
  });

  /* ------------------------------------
     📋 7. Copy to Clipboard Button
  ------------------------------------ */
  $(".note").after(`
    <div class="copy-box">
      <p id="copyText">Free local pickup on orders over $40.</p>
      <button id="copyBtn">Copy</button>
    </div>
  `);

  $("#copyBtn").on("click", function () {
    const text = $("#copyText").text();
    navigator.clipboard.writeText(text);
    $(this).text("✅ Copied!");
    setTimeout(() => $(this).text("Copy"), 2000);
  });

  /* ------------------------------------
     🖼️ 8. Image Lazy Loading
  ------------------------------------ */
  $("img").each(function () {
    const src = $(this).attr("src");
    $(this).attr("data-src", src).removeAttr("src");
  });

  function lazyLoad() {
    $("img[data-src]").each(function () {
      if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
        $(this).attr("src", $(this).attr("data-src"));
        $(this).removeAttr("data-src");
      }
    });
  }

  $(window).on("scroll", lazyLoad);
  lazyLoad();
});

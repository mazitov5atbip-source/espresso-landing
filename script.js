(() => {
  "use strict";

  /* =========================================================
     НАСТРОЙКИ МАГАЗИНА
     Замените телефон и username на реальные данные владельца.
     Телефон WhatsApp — только цифры, без + и пробелов.
     ========================================================= */
  const CONFIG = {
    whatsappPhone: "79990000000",       // ← например: 79001234567
    telegramUsername: "espress_owner",  // ← например: espresso_shop
    deliveryPrice: 290,
    freeDeliveryFrom: 2500,
    storageKey: "espress-cart-v1"
  };

  /* =========================================================
     ДАННЫЕ КАТАЛОГА
     Чтобы добавить товар, скопируйте объект и укажите новый id.
     ========================================================= */
  const categories = [
    { id: "cakes", label: "Торты и пирожные" },
    { id: "bakery", label: "Круассаны и хлеб" },
    { id: "salads", label: "Салаты и закуски" }
  ];

  const products = [
    {
      id: "chocolate-cake",
      category: "cakes",
      name: "Шоколадный торт с карамелью",
      description: "Тонкие шоколадные коржи, нежный крем и солёная карамель. Наш главный бестселлер.",
      weight: "1,2 кг",
      price: 2490,
      badge: "Хит",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80&auto=format&fit=crop",
      alt: "Шоколадный торт с карамелью"
    },
    {
      id: "new-york-cheesecake",
      category: "cakes",
      name: "Чизкейк «Нью-Йорк»",
      description: "Плотная сливочная текстура на песочной основе с домашним ягодным соусом.",
      weight: "900 г",
      price: 1890,
      badge: "",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=900&q=80&auto=format&fit=crop",
      alt: "Чизкейк «Нью-Йорк» с ягодами"
    },
    {
      id: "tiramisu",
      category: "cakes",
      name: "Тирамису в стакане",
      description: "Савоярди, крем маскарпоне и крепкий эспрессо. Десерт, который заряжает.",
      weight: "220 г",
      price: 390,
      badge: "Новинка",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=80&auto=format&fit=crop",
      alt: "Тирамису в стакане"
    },
    {
      id: "pavlova",
      category: "cakes",
      name: "Пирожное «Павлова»",
      description: "Хрустящая меренга, взбитые сливки и сезонные ягоды. Легко и очень нежно.",
      weight: "140 г",
      price: 290,
      badge: "",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80&auto=format&fit=crop",
      alt: "Пирожное «Павлова» с ягодами"
    },
    {
      id: "almond-croissant",
      category: "bakery",
      name: "Круассан с миндалём",
      description: "Слоёный, маслянистый, с миндальным кремом и лепестками миндаля.",
      weight: "120 г",
      price: 220,
      badge: "Хит",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=80&auto=format&fit=crop",
      alt: "Свежие круассаны с миндалём"
    },
    {
      id: "salmon-croissant",
      category: "bakery",
      name: "Круассан с лососем",
      description: "Слабосолёный лосось, сливочный сыр, укроп и свежий огурец.",
      weight: "180 г",
      price: 390,
      badge: "",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=900&q=80&auto=format&fit=crop",
      alt: "Круассан-сэндвич с лососем"
    },
    {
      id: "sourdough",
      category: "bakery",
      name: "Хлеб на закваске",
      description: "Домашний пшенично-ржаной хлеб с хрустящей корочкой. Печём каждое утро.",
      weight: "700 г",
      price: 320,
      badge: "",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80&auto=format&fit=crop",
      alt: "Домашний хлеб на закваске"
    },
    {
      id: "cinnamon-bun",
      category: "bakery",
      name: "Синнабон с корицей",
      description: "Мягкая булочка с корицей и сливочной глазурью. Тёплый уют в одном укусе.",
      weight: "160 г",
      price: 260,
      badge: "Новинка",
      image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=900&q=80&auto=format&fit=crop",
      alt: "Булочка синнабон с корицей"
    },
    {
      id: "greek-salad",
      category: "salads",
      name: "Салат «Греческий»",
      description: "Хрустящие овощи, фета, маслины и оливковое масло с орегано.",
      weight: "280 г",
      price: 390,
      badge: "",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&q=80&auto=format&fit=crop",
      alt: "Салат «Греческий» с фетой"
    },
    {
      id: "quinoa-salad",
      category: "salads",
      name: "Салат с киноа и авокадо",
      description: "Киноа, авокадо, томаты черри, зелень и лёгкая лимонная заправка.",
      weight: "320 г",
      price: 450,
      badge: "Хит",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80&auto=format&fit=crop",
      alt: "Салат с киноа и авокадо"
    },
    {
      id: "caesar-salad",
      category: "salads",
      name: "Цезарь с курицей",
      description: "Романо, куриное филе, пармезан, сухарики и домашний соус цезарь.",
      weight: "300 г",
      price: 420,
      badge: "",
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=900&q=80&auto=format&fit=crop",
      alt: "Салат «Цезарь» с курицей"
    },
    {
      id: "bruschetta",
      category: "salads",
      name: "Брускетты с томатами",
      description: "Поджаренный хлеб, томаты, базилик, чеснок и оливковое масло.",
      weight: "240 г",
      price: 350,
      badge: "",
      image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=900&q=80&auto=format&fit=crop",
      alt: "Брускетты с томатами и базиликом"
    }
  ];

  const productById = new Map(products.map((product) => [product.id, product]));
  const categoryById = new Map(categories.map((category) => [category.id, category]));

  /* =========================================================
     ССЫЛКИ НА DOM-ЭЛЕМЕНТЫ
     ========================================================= */
  const els = {
    header: document.querySelector("#site-header"),
    tabs: document.querySelector("[data-tabs]"),
    grid: document.querySelector("[data-products-grid]"),
    cartTrigger: document.querySelector("[data-cart-open]"),
    cartCount: document.querySelector("[data-cart-count]"),
    cartCountText: document.querySelector("[data-cart-count-text]"),
    cartDrawer: document.querySelector("#cart-drawer"),
    cartOverlay: document.querySelector(".cart-overlay"),
    cartClose: document.querySelector(".cart-close"),
    cartEmpty: document.querySelector("[data-cart-empty]"),
    cartContent: document.querySelector("[data-cart-content]"),
    cartItems: document.querySelector("[data-cart-items]"),
    deliveryText: document.querySelector("[data-delivery-text]"),
    deliveryPercent: document.querySelector("[data-delivery-percent]"),
    progressBar: document.querySelector("[data-progress-bar]"),
    progressFill: document.querySelector("[data-progress-fill]"),
    summarySubtotal: document.querySelector("[data-summary-subtotal]"),
    summaryDelivery: document.querySelector("[data-summary-delivery]"),
    summaryTotal: document.querySelector("[data-summary-total]"),
    checkoutForm: document.querySelector("#checkout-form"),
    telegramSubmit: document.querySelector("[data-telegram-submit]"),
    toast: document.querySelector("[data-toast]")
  };

  const state = {
    activeCategory: categories[0].id,
    cart: loadCart()
  };

  const priceFormatter = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0
  });

  let toastTimer = null;
  let cartCloseTimer = null;
  let lastFocusedElement = null;

  /* =========================================================
     ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
     ========================================================= */
  function formatPrice(value) {
    return `${priceFormatter.format(value)} ₽`;
  }

  function pluralize(count, one, few, many) {
    const mod100 = Math.abs(count) % 100;
    const mod10 = mod100 % 10;

    if (mod100 > 10 && mod100 < 20) return many;
    if (mod10 > 1 && mod10 < 5) return few;
    if (mod10 === 1) return one;
    return many;
  }

  function itemsWord(count) {
    return pluralize(count, "товар", "товара", "товаров");
  }

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(CONFIG.storageKey) || "{}");

      if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
        return {};
      }

      return Object.entries(saved).reduce((cart, [id, quantity]) => {
        const qty = Number(quantity);

        if (productById.has(id) && Number.isInteger(qty) && qty > 0) {
          cart[id] = Math.min(qty, 99);
        }

        return cart;
      }, {});
    } catch (error) {
      return {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(state.cart));
    } catch (error) {
      // Если localStorage недоступен, корзина продолжит работать до перезагрузки.
    }
  }

  function getCartItems() {
    return Object.entries(state.cart)
      .map(([id, quantity]) => {
        const product = productById.get(id);

        if (!product) return null;

        return {
          product,
          quantity,
          lineTotal: product.price * quantity
        };
      })
      .filter(Boolean);
  }

  function getCartTotals() {
    const subtotal = getCartItems().reduce((sum, item) => sum + item.lineTotal, 0);
    const delivery = subtotal === 0 || subtotal >= CONFIG.freeDeliveryFrom
      ? 0
      : CONFIG.deliveryPrice;

    return {
      subtotal,
      delivery,
      total: subtotal + delivery
    };
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");

    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      els.toast.classList.remove("is-visible");
    }, 3200);
  }

  function animateBadge() {
    if (!els.cartCount || els.cartCount.hidden) return;

    els.cartCount.classList.remove("is-bump");
    void els.cartCount.offsetWidth;
    els.cartCount.classList.add("is-bump");
  }

  /* =========================================================
     ВКЛАДКИ И КАТАЛОГ
     ========================================================= */
  function renderTabs() {
    els.tabs.innerHTML = categories
      .map((category, index) => {
        const isActive = category.id === state.activeCategory;

        return `
          <button
            class="menu-tab"
            type="button"
            role="tab"
            id="tab-${category.id}"
            aria-selected="${isActive}"
            aria-controls="products-panel"
            tabindex="${isActive ? "0" : "-1"}"
            data-category="${category.id}"
          >${category.label}</button>
        `;
      })
      .join("");

    els.grid.setAttribute("aria-labelledby", `tab-${state.activeCategory}`);
  }

  function renderProducts(categoryId) {
    const category = categoryById.get(categoryId);

    if (!category) return;

    const categoryProducts = products.filter((product) => product.category === categoryId);

    els.grid.setAttribute("aria-labelledby", `tab-${categoryId}`);
    els.grid.innerHTML = categoryProducts
      .map((product, index) => {
        const badge = product.badge
          ? `<span class="product-badge">${product.badge}</span>`
          : "";

        return `
          <article class="product-card" style="--i: ${index}">
            <div class="product-media">
              <img
                src="${product.image}"
                alt="${product.alt}"
                width="900"
                height="675"
                loading="lazy"
                decoding="async"
              >
              ${badge}
            </div>

            <div class="product-body">
              <p class="product-category">${category.label}</p>
              <h3 class="product-name">${product.name}</h3>
              <p class="product-desc">${product.description}</p>

              <div class="product-meta">
                <span class="product-weight">${product.weight}</span>
                <span class="product-fresh">готовим сегодня</span>
              </div>

              <div class="product-footer">
                <span class="product-price">${formatPrice(product.price)}</span>
                <button
                  class="add-btn"
                  type="button"
                  data-add-to-cart="${product.id}"
                  aria-label="Добавить «${product.name}» в корзину"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                  </svg>
                  <span>В корзину</span>
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function setActiveCategory(categoryId, focusTab = false) {
    if (!categoryById.has(categoryId)) return;

    state.activeCategory = categoryId;

    const tabs = Array.from(els.tabs.querySelectorAll('[role="tab"]'));

    tabs.forEach((tab) => {
      const isActive = tab.dataset.category === categoryId;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;

      if (isActive && focusTab) {
        tab.focus();
      }
    });

    renderProducts(categoryId);
  }

  /* =========================================================
     КОРЗИНА
     ========================================================= */
  function addToCart(productId, button) {
    const product = productById.get(productId);
    if (!product) return;

    const currentQuantity = state.cart[productId] || 0;
    state.cart[productId] = Math.min(currentQuantity + 1, 99);

    saveCart();
    renderCart();
    animateBadge();
    showToast(`«${product.name}» добавлен в корзину`);

    if (button) {
      const label = button.querySelector("span");
      const originalLabel = "В корзину";

      button.classList.add("is-added");
      if (label) label.textContent = "Добавлено";

      window.clearTimeout(button._resetTimer);
      button._resetTimer = window.setTimeout(() => {
        if (!button.isConnected) return;
        button.classList.remove("is-added");
        if (label) label.textContent = originalLabel;
      }, 1200);
    }
  }

  function changeQuantity(productId, delta) {
    const currentQuantity = state.cart[productId] || 0;
    const nextQuantity = currentQuantity + delta;

    if (nextQuantity <= 0) {
      delete state.cart[productId];
    } else {
      state.cart[productId] = Math.min(nextQuantity, 99);
    }

    saveCart();
    renderCart();

    if (nextQuantity > 0) {
      const nextButton = els.cartItems.querySelector(
        `[data-action="${delta > 0 ? "increase" : "decrease"}"][data-id="${productId}"]`
      );
      if (nextButton) nextButton.focus({ preventScroll: true });
    }
  }

  function removeFromCart(productId) {
    const product = productById.get(productId);
    if (!product) return;

    delete state.cart[productId];
    saveCart();
    renderCart();
    showToast(`«${product.name}» удалён из корзины`);
  }

  function renderCart() {
    const items = getCartItems();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const totals = getCartTotals();

    // Индикатор в шапке
    els.cartCount.hidden = itemCount === 0;
    els.cartCount.textContent = itemCount > 99 ? "99+" : String(itemCount);
    els.cartTrigger.setAttribute(
      "aria-label",
      itemCount > 0 ? `Открыть корзину, товаров: ${itemCount}` : "Открыть корзину"
    );
    els.cartCountText.textContent = itemCount > 0
      ? `· ${itemCount} ${itemsWord(itemCount)}`
      : "";

    // Пустая корзина / содержимое
    els.cartEmpty.hidden = items.length > 0;
    els.cartContent.hidden = items.length === 0;

    if (items.length === 0) {
      els.cartItems.innerHTML = "";
      return;
    }

    // Список товаров
    els.cartItems.innerHTML = items
      .map(({ product, quantity, lineTotal }) => `
        <li class="cart-item">
          <img
            class="cart-item-img"
            src="${product.image}"
            alt="${product.alt}"
            width="76"
            height="76"
            loading="lazy"
          >

          <div class="cart-item-info">
            <div class="cart-item-top">
              <div>
                <h3 class="cart-item-name">${product.name}</h3>
                <p class="cart-item-weight">${product.weight}</p>
              </div>
              <button
                class="cart-remove"
                type="button"
                data-action="remove"
                data-id="${product.id}"
                aria-label="Удалить «${product.name}» из корзины"
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
                  <path d="M5 7h14M9.5 7V5.5h5V7M7 7l.8 12h8.4L17 7M10 10.5v5M14 10.5v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>

            <div class="cart-item-bottom">
              <div class="qty-stepper" aria-label="Количество товара">
                <button
                  class="qty-btn"
                  type="button"
                  data-action="decrease"
                  data-id="${product.id}"
                  aria-label="Уменьшить количество «${product.name}»"
                >−</button>
                <span class="qty-value" aria-live="polite">${quantity}</span>
                <button
                  class="qty-btn"
                  type="button"
                  data-action="increase"
                  data-id="${product.id}"
                  aria-label="Увеличить количество «${product.name}»"
                  ${quantity >= 99 ? "disabled" : ""}
                >+</button>
              </div>

              <span class="cart-line-price">${formatPrice(lineTotal)}</span>
            </div>
          </div>
        </li>
      `)
      .join("");

    // Прогресс бесплатной доставки
    const remaining = Math.max(CONFIG.freeDeliveryFrom - totals.subtotal, 0);
    const progress = Math.min(
      100,
      Math.round((totals.subtotal / CONFIG.freeDeliveryFrom) * 100)
    );

    els.deliveryText.textContent = remaining > 0
      ? `До бесплатной доставки — ${formatPrice(remaining)}`
      : "Бесплатная доставка — уже ваша";
    els.deliveryPercent.textContent = `${progress}%`;
    els.progressFill.style.width = `${progress}%`;
    els.progressBar.setAttribute("aria-valuenow", String(progress));

    // Итоговые суммы
    els.summarySubtotal.textContent = formatPrice(totals.subtotal);
    els.summaryDelivery.textContent = totals.delivery === 0
      ? "Бесплатно"
      : formatPrice(totals.delivery);
    els.summaryTotal.textContent = formatPrice(totals.total);
  }

  /* =========================================================
     ОТКРЫТИЕ И ЗАКРЫТИЕ КОРЗИНЫ
     ========================================================= */
  function isCartOpen() {
    return els.cartDrawer.classList.contains("is-open");
  }

  function openCart() {
    if (isCartOpen()) return;

    window.clearTimeout(cartCloseTimer);
    lastFocusedElement = document.activeElement;

    renderCart();
    document.body.classList.add("cart-open");
    els.cartOverlay.classList.add("is-open");
    els.cartOverlay.setAttribute("aria-hidden", "false");
    els.cartDrawer.classList.add("is-open");
    els.cartDrawer.removeAttribute("inert");
    els.cartDrawer.setAttribute("aria-hidden", "false");
    els.cartTrigger.setAttribute("aria-expanded", "true");

    window.requestAnimationFrame(() => {
      els.cartClose.focus({ preventScroll: true });
    });
  }

  function closeCart() {
    if (!isCartOpen()) return;

    els.cartDrawer.classList.remove("is-open");
    els.cartOverlay.classList.remove("is-open");
    els.cartDrawer.setAttribute("aria-hidden", "true");
    els.cartOverlay.setAttribute("aria-hidden", "true");
    els.cartTrigger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("cart-open");

    cartCloseTimer = window.setTimeout(() => {
      if (!isCartOpen()) {
        els.cartDrawer.setAttribute("inert", "");
      }
    }, 380);

    if (lastFocusedElement && document.contains(lastFocusedElement)) {
      lastFocusedElement.focus({ preventScroll: true });
    }
  }

  function trapFocus(event) {
    if (!isCartOpen() || event.key !== "Tab") return;

    const focusableElements = Array.from(
      els.cartDrawer.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.getClientRects().length > 0);

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  /* =========================================================
     ОФОРМЛЕНИЕ ЗАКАЗА
     ========================================================= */
  function setupFormAccessibility() {
    ["name", "phone", "address"].forEach((name) => {
      const input = els.checkoutForm.elements[name];
      const error = els.checkoutForm.querySelector(`[data-error-for="${name}"]`);

      if (input && error) {
        error.id = `order-${name}-error`;
        input.setAttribute("aria-describedby", error.id);
      }
    });
  }

  function setFieldError(name, message) {
    const input = els.checkoutForm.elements[name];
    const field = els.checkoutForm.querySelector(`[data-field="${name}"]`);
    const error = els.checkoutForm.querySelector(`[data-error-for="${name}"]`);

    if (input) input.setAttribute("aria-invalid", "true");
    if (field) field.classList.add("has-error");
    if (error) error.textContent = message;
  }

  function clearFieldError(name) {
    const input = els.checkoutForm.elements[name];
    const field = els.checkoutForm.querySelector(`[data-field="${name}"]`);
    const error = els.checkoutForm.querySelector(`[data-error-for="${name}"]`);

    if (input) input.removeAttribute("aria-invalid");
    if (field) field.classList.remove("has-error");
    if (error) error.textContent = "";
  }

  function validateForm() {
    const nameInput = els.checkoutForm.elements.name;
    const phoneInput = els.checkoutForm.elements.phone;
    const addressInput = els.checkoutForm.elements.address;
    const paymentInput = els.checkoutForm.querySelector('input[name="payment"]:checked');

    const values = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      address: addressInput.value.trim(),
      payment: paymentInput ? paymentInput.value : ""
    };

    ["name", "phone", "address"].forEach(clearFieldError);

    let firstInvalidInput = null;

    if (values.name.length < 2) {
      setFieldError("name", "Укажите имя — хотя бы 2 символа.");
      firstInvalidInput = nameInput;
    }

    const phoneDigits = values.phone.replace(/\D/g, "");
    const phoneCharactersAreValid = /^[+\d\s()-]+$/.test(values.phone);

    if (!phoneCharactersAreValid || phoneDigits.length < 10 || phoneDigits.length > 15) {
      setFieldError("phone", "Введите телефон, например +7 999 000-00-00.");
      if (!firstInvalidInput) firstInvalidInput = phoneInput;
    }

    if (values.address.length < 5) {
      setFieldError("address", "Укажите улицу, дом и квартиру.");
      if (!firstInvalidInput) firstInvalidInput = addressInput;
    }

    if (!values.payment) {
      showToast("Выберите способ оплаты.");
      if (!firstInvalidInput) firstInvalidInput = paymentInput;
    }

    if (firstInvalidInput) {
      firstInvalidInput.focus({ preventScroll: false });
      showToast("Проверьте данные для доставки.");
      return null;
    }

    return values;
  }

  function buildOrderMessage(orderData) {
    const items = getCartItems();
    const totals = getCartTotals();

    const itemLines = items.map(({ product, quantity, lineTotal }) => (
      `• ${product.name} — ${quantity} × ${formatPrice(product.price)} = ${formatPrice(lineTotal)}`
    ));

    return [
      "Здравствуйте! Хочу оформить заказ в «Эспресс».",
      "",
      ...itemLines,
      "",
      `Товары: ${formatPrice(totals.subtotal)}`,
      `Доставка: ${totals.delivery === 0 ? "бесплатно" : formatPrice(totals.delivery)}`,
      `Итого: ${formatPrice(totals.total)}`,
      "",
      `Имя: ${orderData.name}`,
      `Телефон: ${orderData.phone}`,
      `Адрес: ${orderData.address}`,
      `Оплата: ${orderData.payment}`,
      "",
      "Подтвердите, пожалуйста, заказ и время доставки."
    ].join("\n");
  }

  function submitOrder(channel) {
    if (getCartItems().length === 0) {
      showToast("Сначала добавьте товары в корзину.");
      return;
    }

    const orderData = validateForm();
    if (!orderData) return;

    const message = buildOrderMessage(orderData);
    const encodedMessage = encodeURIComponent(message);

    const url = channel === "telegram"
      ? `https://t.me/${CONFIG.telegramUsername}?text=${encodedMessage}`
      : `https://wa.me/${CONFIG.whatsappPhone}?text=${encodedMessage}`;

    // Клик по ссылке в рамках пользовательского действия надёжнее, чем window.open.
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();

    showToast(
      channel === "telegram"
        ? "Открываем Telegram. Отправьте готовое сообщение."
        : "Открываем WhatsApp. Отправьте готовое сообщение."
    );
  }

  /* =========================================================
     ОБРАБОТЧИКИ СОБЫТИЙ
     ========================================================= */
  function bindEvents() {
    // Прокрутка шапки
    const updateHeader = () => {
      els.header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    // Вкладки
    els.tabs.addEventListener("click", (event) => {
      const tab = event.target.closest('[role="tab"]');
      if (!tab) return;
      setActiveCategory(tab.dataset.category);
    });

    els.tabs.addEventListener("keydown", (event) => {
      const tabs = Array.from(els.tabs.querySelectorAll('[role="tab"]'));
      const currentIndex = tabs.indexOf(document.activeElement);

      if (currentIndex === -1) return;

      let nextIndex = null;

      if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;

      if (nextIndex === null) return;

      event.preventDefault();
      setActiveCategory(tabs[nextIndex].dataset.category, true);
    });

    // Добавление товара из каталога
    els.grid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-add-to-cart]");
      if (!button) return;
      addToCart(button.dataset.addToCart, button);
    });

    // Управление количеством и удаление в корзине
    els.cartItems.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;

      const { action, id } = button.dataset;

      if (action === "increase") changeQuantity(id, 1);
      if (action === "decrease") changeQuantity(id, -1);
      if (action === "remove") removeFromCart(id);
    });

    // Открытие / закрытие корзины
    document.querySelectorAll("[data-cart-open]").forEach((button) => {
      button.addEventListener("click", openCart);
    });

    document.querySelectorAll("[data-cart-close]").forEach((element) => {
      element.addEventListener("click", closeCart);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isCartOpen()) {
        event.preventDefault();
        closeCart();
        return;
      }

      trapFocus(event);
    });

    // Форма
    els.checkoutForm.addEventListener("input", (event) => {
      const fieldName = event.target.name;
      if (["name", "phone", "address"].includes(fieldName)) {
        clearFieldError(fieldName);
      }
    });

    els.checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitOrder("whatsapp");
    });

    els.telegramSubmit.addEventListener("click", () => {
      submitOrder("telegram");
    });

    // Текущий год в подвале
    const yearElement = document.querySelector("[data-current-year]");
    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }
  }

  /* =========================================================
     ЗАПУСК
     ========================================================= */
  function init() {
    renderTabs();
    renderProducts(state.activeCategory);
    renderCart();
    setupFormAccessibility();
    bindEvents();
  }

  init();
})();

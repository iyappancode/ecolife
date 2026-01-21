const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Icons
const hamburgerIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>`;

const closeIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`;

// initialize icon if missing
if (!menuBtn.querySelector('svg')) {
    menuBtn.innerHTML = hamburgerIcon;
}

function setMenuIcon(isOpen) {
    menuBtn.innerHTML = isOpen ? closeIcon : hamburgerIcon;
}

menuBtn.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('active');
    setMenuIcon(isActive);
});

// Close menu on link click and reset icon
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        setMenuIcon(false);
    });
});

        // Shopping Cart System
        const cart = [];

        // DOM Elements
        const cartBtn = document.getElementById('cartBtn');
        const cartOverlay = document.getElementById('cartOverlay');
        const cartDrawer = document.getElementById('cartDrawer');
        const cartCloseBtn = document.getElementById('cartCloseBtn');
        const cartContinueBtn = document.getElementById('cartContinueBtn');
        const cartBadge = document.getElementById('cartBadge');
        const cartCountText = document.getElementById('cartCountText');
        const cartEmpty = document.getElementById('cartEmpty');
        const cartItems = document.getElementById('cartItems');
        const cartFooter = document.getElementById('cartFooter');
        const cartTotal = document.getElementById('cartTotal');
        const addToCartButtons = document.querySelectorAll('.add-to-cart');

        // Open Cart
        function openCart() {
            cartOverlay.classList.add('active');
            cartDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Close Cart
        function closeCart() {
            cartOverlay.classList.remove('active');
            cartDrawer.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Update Cart UI
        function updateCartUI() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Update badge
            if (totalItems > 0) {
                cartBadge.textContent = totalItems;
                cartBadge.classList.remove('hidden');
            } else {
                cartBadge.classList.add('hidden');
            }

            // Update cart count text
            cartCountText.textContent = totalItems;

            // Update total
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

            // Show/hide empty state
            if (cart.length === 0) {
                cartEmpty.classList.remove('hidden');
                cartItems.classList.add('hidden');
                cartFooter.classList.add('hidden');
            } else {
                cartEmpty.classList.add('hidden');
                cartItems.classList.remove('hidden');
                cartFooter.classList.remove('hidden');
            }

            // Render cart items
            renderCartItems();
        }

        // Render Cart Items
        function renderCartItems() {
            cartItems.innerHTML = '';

            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-controls">
                            <div class="quantity-control">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})" aria-label="Decrease quantity">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})" aria-label="Increase quantity">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                            </div>
                            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                    <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                `;
                cartItems.appendChild(itemEl);
            });

            // Add clear cart button if there are items
            if (cart.length > 0) {
                const clearBtn = document.createElement('button');
                clearBtn.className = 'cart-clear';
                clearBtn.textContent = 'Clear Cart';
                clearBtn.onclick = clearCart;
                cartItems.appendChild(clearBtn);
            }
        }

        // Add to Cart
        function addToCart(id, name, price, image) {
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }

            updateCartUI();
            openCart();
        }

        // Remove from Cart
        function removeFromCart(id) {
            const index = cart.findIndex(item => item.id === id);
            if (index !== -1) {
                cart.splice(index, 1);
                updateCartUI();
            }
        }

        // Update Quantity
        function updateQuantity(id, newQuantity) {
            if (newQuantity <= 0) {
                removeFromCart(id);
                return;
            }

            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity = newQuantity;
                updateCartUI();
            }
        }

        // Clear Cart
        function clearCart() {
            cart.length = 0;
            updateCartUI();
        }

        // Event Listeners
        cartBtn.addEventListener('click', openCart);
        cartOverlay.addEventListener('click', closeCart);
        cartCloseBtn.addEventListener('click', closeCart);
        cartContinueBtn.addEventListener('click', closeCart);

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const name = this.dataset.name;
                const price = parseFloat(this.dataset.price);
                const image = this.dataset.image;
                addToCart(id, name, price, image);
            });
        });

        // Newsletter Form Submission
        document.getElementById('newsletterForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value;
            const messageDiv = document.getElementById('newsletterMessage');
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                messageDiv.className = 'newsletter-message newsletter-error';
                messageDiv.textContent = '⚠️ Please enter a valid email address';
                messageDiv.classList.remove('hidden');
                return;
            }
            
            // Success message
            messageDiv.className = 'newsletter-message newsletter-success';
            messageDiv.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Thank you for subscribing!
            `;
            messageDiv.classList.remove('hidden');
            
            // Clear form
            document.getElementById('newsletterEmail').value = '';
            
            // Hide message after 3 seconds
            setTimeout(() => {
                messageDiv.classList.add('hidden');
            }, 3000);
        });
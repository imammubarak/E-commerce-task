// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fetch and Display Categories
async function fetchAndDisplayCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const categories = await response.json();
        const categoriesContainer = document.getElementById('categories-container');
        if (categoriesContainer) {
            categoriesContainer.innerHTML = categories.map(category => `
                <div class="category-item">
                    <a href="category.html?category=${category}">
                        <div class="category-name">${category},</div>
                    </a>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Fetch and Display Products
async function fetchAndDisplayProducts(category = null) {
    try {
        const url = category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        const productsContainer = document.getElementById('products-container');
        if (productsContainer) {
            productsContainer.innerHTML = products.map(product => `
                <div class="product-item">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id}, '${product.title}', '${product.image}', ${product.price})">Add to Cart</button>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Add Product to Cart
function addToCart(id, title, image, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, image, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Item added to cart!');
}

// Update Cart Count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = itemCount;
    }
}

// Display Cart Items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartTotalElement = document.getElementById('cart-total');

    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <p>$${item.price}</p>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(${item.id}, this.value)">
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `).join('');

            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const total = subtotal;

            cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            cartTotalElement.textContent = `$${total.toFixed(2)}`;
        }
    }
}

// Update Cart Item Quantity
function updateCartItemQuantity(id, quantity) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = parseInt(quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

// Remove Product from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Proceed to Checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    window.location.href = 'checkout.html';
}

// Display order summary on the checkout page
function displayCheckoutSummary() {
    const checkoutSummaryContainer = document.getElementById('checkout-summary');
    const cartTotalElement = document.getElementById('cart-total');

    if (!checkoutSummaryContainer) {
        console.error('Checkout summary container not found.');
        return;
    }

    if (cart.length === 0) {
        checkoutSummaryContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        checkoutSummaryContainer.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <img src="${item.image}" alt="${item.title}" style="width: 100px; height: 100px;">
                <div>
                    <h3>${item.title}</h3>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
}


// Handle Checkout
function handleCheckout(event) {
    event.preventDefault();

    console.log('Order placed:', cart);

    // Clear cart after order is placed
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    alert('order placed sucessfully !Thank you for your purchase!');
    window.location.href = 'index.html';
}

// Initialize Functions
function init() {
    fetchAndDisplayCategories();
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    fetchAndDisplayProducts(category);
    updateCartCount();
    displayCartItems();
    displayCheckoutSummary();

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }

    const proceedToCheckoutButton = document.getElementById('proceed-to-checkout');
    if (proceedToCheckoutButton) {
        proceedToCheckoutButton.addEventListener('click', proceedToCheckout);
    }
}


// Fetch and display categories
function fetchAndDisplayCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categories => {
            const categoriesContainer = document.getElementById('categories-container');
            if (!categoriesContainer) return;
            categoriesContainer.innerHTML = '';
            categories.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.className = 'category-item';
                categoryElement.innerHTML = `
                    <div class="category-name">${category}</div>
                    <button onclick="filterProductsByCategory('${category}')">View Products</button>
                `;
                categoriesContainer.appendChild(categoryElement);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}

// Fetch and display products by category
function filterProductsByCategory(category) {
    const formattedCategory = category.replace(/\s+/g, '%20');
    fetch(`https://fakestoreapi.com/products/category/${formattedCategory}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(products => {
            const productsContainer = document.getElementById('products-container');
            if (!productsContainer) return;
            productsContainer.innerHTML = '';
            if (products.length === 0) {
                productsContainer.innerHTML = '<p>No products found in this category.</p>';
                return;
            }
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product-item';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Add to Cart
function addToCart(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                product.quantity = 1;
                cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        })
        .catch(error => console.error('Error adding to cart:', error));
}

// Update Cart Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalQuantity;
    }
}

// Initialize the categories display on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayCategories();
    updateCartCount();
});


document.addEventListener('DOMContentLoaded', init);


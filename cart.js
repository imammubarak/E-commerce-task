// document.addEventListener('DOMContentLoaded', function() {
//     const cartItemsContainer = document.getElementById('cart-items');
//     const cartSubtotal = document.getElementById('cart-subtotal');
//     const cartTotal = document.getElementById('cart-total');
//     const cartCount = document.getElementById('cart-count');

//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     function renderCart() {
//         cartItemsContainer.innerHTML = '';
//         cart.forEach(item => {
//             const cartItemElement = document.createElement('div');
//             cartItemElement.classList.add('cart-item');
//             cartItemElement.innerHTML = `
//                 <img src="${item.image}" alt="${item.title}">
//                 <div class="cart-item-details">
//                     <h3>${item.title}</h3>
//                     <p>$${item.price.toFixed(2)}</p>
//                     <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="item-quantity">
//                     <button class="remove-item" data-id="${item.id}">Remove</button>
//                 </div>
//             `;
//             cartItemsContainer.appendChild(cartItemElement);
//         });
//         updateCartSummary();
//         updateCartCount();
//     }

//     function updateCartSummary() {
//         const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//         cartSubtotal.textContent = subtotal.toFixed(2);
//         cartTotal.textContent = subtotal.toFixed(2);
//     }

//     function updateCartCount() {
//         const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
//         cartCount.textContent = itemCount;
//     }

//     cartItemsContainer.addEventListener('change', function(e) {
//         if (e.target.classList.contains('item-quantity')) {
//             const productId = e.target.getAttribute('data-id');
//             const quantity = parseInt(e.target.value);
//             const cartItem = cart.find(item => item.id === productId);

//             if (cartItem) {
//                 cartItem.quantity = quantity;
//                 localStorage.setItem('cart', JSON.stringify(cart));
//                 updateCartSummary();
//                 updateCartCount();
//             }
//         }
//     });

//     cartItemsContainer.addEventListener('click', function(e) {
//         if (e.target.classList.contains('remove-item')) {
//             const productId = e.target.getAttribute('data-id');
//             cart = cart.filter(item => item.id !== productId);
//             localStorage.setItem('cart', JSON.stringify(cart));
//             renderCart();
//         }
//     });

//     renderCart();
// });







document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="item-quantity">
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        updateCartSummary();
        updateCartCount();
    }

    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartSubtotal.textContent = subtotal.toFixed(2);
        cartTotal.textContent = subtotal.toFixed(2);
    }

    function updateCartCount() {
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = itemCount;
    }

    cartItemsContainer.addEventListener('change', function(e) {
        if (e.target.classList.contains('item-quantity')) {
            const productId = e.target.getAttribute('data-id');
            const quantity = parseInt(e.target.value);
            const cartItem = cart.find(item => item.id === productId);

            if (cartItem) {
                cartItem.quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartSummary();
                updateCartCount();
            }
        }
    });

    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const productId = e.target.getAttribute('data-id');
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    renderCart();
});

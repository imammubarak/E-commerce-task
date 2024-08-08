// document.addEventListener('DOMContentLoaded', function() {
//     const orderSummaryItemsContainer = document.getElementById('order-summary-items');
//     const orderSummarySubtotal = document.getElementById('order-summary-subtotal');
//     const orderSummaryTotal = document.getElementById('order-summary-total');

//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     function renderOrderSummary() {
//         orderSummaryItemsContainer.innerHTML = '';
//         cart.forEach(item => {
//             const orderSummaryItemElement = document.createElement('div');
//             orderSummaryItemElement.classList.add('checkout-item');
//             orderSummaryItemElement.innerHTML = `
//                 <img src="${item.images[0]}" alt="${item.title}" class="checkout-item-image">
//                 <div class="checkout-item-details">
//                     <h3>${item.title}</h3>
//                     <p>$${item.price.toFixed(2)}</p>
//                     <p>Quantity: ${item.quantity}</p>
//                 </div>
//             `;
//             orderSummaryItemsContainer.appendChild(orderSummaryItemElement);
//         });
//         updateOrderSummary();
//     }

//     function updateOrderSummary() {
//         const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//         orderSummarySubtotal.textContent = subtotal.toFixed(2);
//         orderSummaryTotal.textContent = subtotal.toFixed(2);
//     }

//     renderOrderSummary();
// });



document.addEventListener('DOMContentLoaded', function() {
    const orderSummaryItemsContainer = document.getElementById('order-summary-items');
    const orderSummarySubtotal = document.getElementById('order-summary-subtotal');
    const orderSummaryTotal = document.getElementById('order-summary-total');
    const checkoutForm = document.getElementById('checkout-form');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderOrderSummary() {
        orderSummaryItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const orderSummaryItemElement = document.createElement('div');
            orderSummaryItemElement.classList.add('checkout-item');
            orderSummaryItemElement.innerHTML = `
                <img src="${item.images[0]}" alt="${item.title}" class="checkout-item-image">
                <div class="checkout-item-details">
                    <h3>${item.title}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            `;
            orderSummaryItemsContainer.appendChild(orderSummaryItemElement);
        });
        updateOrderSummary();
    }

    function updateOrderSummary() {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        orderSummarySubtotal.textContent = subtotal.toFixed(2);
        orderSummaryTotal.textContent = subtotal.toFixed(2);
    }

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Capture billing, shipping, and payment information
        const billingName = document.getElementById('billing-name').value;
        const billingAddress = document.getElementById('billing-address').value;
        const billingEmail = document.getElementById('billing-email').value;
        const billingPhone = document.getElementById('billing-phone').value;

        const shippingName = document.getElementById('shipping-name').value;
        const shippingAddress = document.getElementById('shipping-address').value;
        const shippingEmail = document.getElementById('shipping-email').value;
        const shippingPhone = document.getElementById('shipping-phone').value;

        const paymentCardNumber = document.getElementById('payment-card-number').value;
        const paymentExpiryDate = document.getElementById('payment-expiry-date').value;
        const paymentCVV = document.getElementById('payment-cvv').value;

        // Normally, you would send this data to a server here.
        // For this example, we'll just log it and show a success message.
        console.log({
            billing: { billingName, billingAddress, billingEmail, billingPhone },
            shipping: { shippingName, shippingAddress, shippingEmail, shippingPhone },
            payment: { paymentCardNumber, paymentExpiryDate, paymentCVV }
        });

        // Display success message and clear the cart
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html'; // Redirect to home page or another page
    });

    renderOrderSummary();
});


document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = itemCount;
    }
});

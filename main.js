document.addEventListener('DOMContentLoaded', function() {
    const cartCount = document.getElementById('cart-count');
    updateCartCount();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const product = {
                id: productId,
                title: this.closest('.product').querySelector('h3').textContent,
                price: parseFloat(this.closest('.product').querySelector('p').textContent.replace('$', '')),
                quantity: 1,
                image: this.closest('.product').querySelector('img').src
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        });
    });

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = itemCount;
    }
});

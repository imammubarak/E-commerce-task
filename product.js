document.addEventListener('DOMContentLoaded', function() {
    const productTitle = document.getElementById('product-title');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const mainProductImage = document.getElementById('main-product-image');
    const thumbnailImagesContainer = document.querySelector('.thumbnail-images');
    const addToCartButton = document.getElementById('add-to-cart-button');

    // Example product data - in a real scenario, fetch from API
    const product = {
        id: '1',
        title: 'Classic Heather Gray Hoodie',
        description: 'This is quality hoodie material direct from UK.',
        price: 99.99,
        images: [
            '../images/product-1.jpeg',
            '../images/product-2.jpeg',
            '../images/product-3.jpeg'
        ]
    };

    // Render product details
    function renderProductDetails() {
        productTitle.textContent = product.title;
        productDescription.textContent = product.description;
        productPrice.textContent = product.price.toFixed(2);
        mainProductImage.src = product.images[0];
        
        // Render thumbnail images
        product.images.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = `Product Image ${index + 1}`;
            imgElement.addEventListener('click', () => {
                mainProductImage.src = image;
            });
            thumbnailImagesContainer.appendChild(imgElement);
        });
    }

    // Add product to cart
    function addToCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItem = cart.find(item => item.id === product.id);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Update cart count in header
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = itemCount;
    }

    addToCartButton.addEventListener('click', addToCart);

    renderProductDetails();
    updateCartCount();
});

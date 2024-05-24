document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://fakestoreapi.com/products';

    // Function to fetch and display products
    const loadProducts = async () => {
        const response = await fetch(apiUrl);
        const products = await response.json();
        const productContainer = document.getElementById('products');

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="viewProduct(${product.id})">View Details</button>
            `;
            productContainer.appendChild(productElement);
        });
    };

    // Function to fetch and display product details
    const loadProductDetails = async (productId) => {
        const response = await fetch(`${apiUrl}/${productId}`);
        const product = await response.json();
        const productDetailsContainer = document.getElementById('product-details');

        productDetailsContainer.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="goBack()">Go Back</button>
        `;
    };

    // Navigate to product details page
    window.viewProduct = (productId) => {
        window.location.href = `product.html?id=${productId}`;
    };

    // Navigate back to product listing page
    window.goBack = () => {
        window.history.back();
    };

    // Check if we are on the product details page and load details
    if (window.location.pathname.endsWith('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        loadProductDetails(productId);
    } else {
        loadProducts();
    }
});

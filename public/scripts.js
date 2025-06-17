document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript is loaded and ready!");

    const apiUrl = "/api/products"; // Local JSON file endpoint
    const userApiUrl = "/api/users"; // User API endpoint

    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Network response was not ok");
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    async function fetchUsers() {
        try {
            const response = await fetch(userApiUrl);
            if (!response.ok) throw new Error("Network response was not ok");
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    function displayProducts(products) {
        const productList = document.getElementById("product-list");
        productList.innerHTML = ""; // Clear previous content

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "product";
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
        addCartEventListeners();
    }

    function displayUsers(users) {
        const userList = document.getElementById("user-list");
        userList.innerHTML = ""; // Clear previous content

        users.forEach(user => {
            const userDiv = document.createElement("div");
            userDiv.className = "user";
            userDiv.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
            `;
            userList.appendChild(userDiv);
        });
    }

    function addCartEventListeners() {
        const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
        addToCartButtons.forEach(button => {
            button.addEventListener("click", handleAddToCart);
        });
    }

    function handleAddToCart(event) {
        const productId = event.target.getAttribute("data-id");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    }

    function handleThemeChange(event) {
        const theme = event.target.value;
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }

    function applyStoredTheme() {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            document.body.className = storedTheme;
            document.getElementById("theme-select").value = storedTheme;
        }
    }

    fetchProducts();
    fetchUsers();
    applyStoredTheme();

    document.getElementById("signup-form").addEventListener("submit", handleSignUp);
    document.getElementById("theme-select").addEventListener("change", handleThemeChange);
});

async function handleSignUp(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const user = { username, email, password };

    const response = await fetch("https://mockapi.io/users", { // Replace with actual API or mock endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    console.log("User signed up:", data);
    alert("Sign up successful!");
}
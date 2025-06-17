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

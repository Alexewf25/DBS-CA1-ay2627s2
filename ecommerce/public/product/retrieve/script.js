let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username") || "User";
  document.getElementById("navUsername").textContent = username;

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/auth/login";
    return;
  }
  loadProducts();
});

// =============================================================
// TODO: Implement this function to create a comment
// This function should:
// 1. Read the review ID and comment text from the form
// 2. Send a POST request to /api/comment/create
// 3. Display a success or error message
// =============================================================
function createComment(reviewId) {
  // TODO: Students to implement this function
}

// =============================================================
// TODO: Implement this function to delete a comment
// This function should:
// 1. Read the comment ID from the form
// 2. Send a DELETE request to /api/comment/delete
// 3. Display a success or error message
// =============================================================
function deleteComment(commentId) {
  // TODO: Students to implement this function
}

async function loadProducts() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch("/api/product/retrieve/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      allProducts = data.products;
      renderProducts(allProducts);
    } else {
      showError(data.message);
    }
  } catch (err) {
    showError("Failed to load products. Please try again.");
  }
}

function renderProducts(products) {
  const grid = document.getElementById("productGrid");
  const countEl = document.getElementById("productCount");

  countEl.textContent = `Showing ${products.length} product${products.length !== 1 ? "s" : ""}`;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your search or filter.</p>
      </div>`;
    return;
  }

  grid.innerHTML = products.map((p) => {
    const stockClass = p.stockQuantity === 0 ? "out" : p.stockQuantity < 20 ? "low" : "";
    const stockLabel = p.stockQuantity === 0 ? "Out of Stock" : `${p.stockQuantity} in stock`;
    return `
      <div class="product-card">
        <div class="product-image-wrapper">
          <div class="product-image-placeholder">🍶</div>
          <span class="product-type-badge">${p.productType || "Bottle"}</span>
        </div>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-description">${p.description || "No description available."}</div>
          <div class="product-country">🌏 Made in ${p.country || "N/A"}</div>
          <div class="product-meta">
            <span class="product-price">S$${parseFloat(p.unitPrice).toFixed(2)}</span>
            <span class="product-stock ${stockClass}">${stockLabel}</span>
          </div>
          <button class="btn-review" onclick="goToReview(${p.id}, '${encodeURIComponent(p.name)}')">
            ✍️ Write a Review
          </button>
        </div>
      </div>`;
  }).join("");
}

function filterProducts() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const sort = document.getElementById("sortFilter").value;

  let filtered = allProducts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search) ||
      (p.description && p.description.toLowerCase().includes(search));
    const matchCategory = !category || p.productType === category;
    return matchSearch && matchCategory;
  });

  if (sort === "price-asc") filtered.sort((a, b) => a.unitPrice - b.unitPrice);
  else if (sort === "price-desc") filtered.sort((a, b) => b.unitPrice - a.unitPrice);
  else if (sort === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));

  renderProducts(filtered);
}

function goToReview(productId, productName) {
  localStorage.setItem("selectedProductId", productId);
  localStorage.setItem("selectedProductName", decodeURIComponent(productName));
  window.location.href = "/review/create";
}

function logout() {
  localStorage.clear();
  window.location.href = "/auth/login";
}

function showError(msg) {
  const el = document.getElementById("message");
  el.textContent = msg;
  el.className = "message error";
}
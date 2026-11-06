document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Redirect non-admins away
  if (!token || parseInt(role) !== 1) {
    window.location.href = "/auth/login";
    return;
  }

  const username = localStorage.getItem("username") || "Admin";
  document.getElementById("navUsername").textContent = username;

  // Set default date range: last 6 months to today
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  document.getElementById("endDate").value = formatDate(today);
  document.getElementById("startDate").value = formatDate(sixMonthsAgo);
});

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

async function loadSummary() {
  const token = localStorage.getItem("token");
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const productCategory = document.getElementById("productCategory").value;
  const sortBy = document.getElementById("sortBy").value;
  const gender = document.getElementById("genderFilter").value;
  const status = document.getElementById("statusFilter").value;
  const msgEl = document.getElementById("message");

  // Basic date validation
  if (startDate && endDate && startDate > endDate) {
    showMessage(msgEl, "Start date cannot be after end date.", "error");
    return;
  }

  msgEl.className = "message hidden";

  // Show loading skeletons
  showLoadingRows();

  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  if (productCategory) params.append("productType", productCategory);
  if (sortBy) params.append("sortBy", sortBy);
  if (gender) params.append("gender", gender);
  if (status) params.append("status", status);

  try {
    const res = await fetch(`/api/admin/dashboard/salesOrderSummary?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (data.success) {
      renderTable(data.data);
      updateStatCards(data.data);
    } else {
      showMessage(msgEl, data.message || "Failed to load data.", "error");
      clearTable();
    }
  } catch (err) {
    showMessage(msgEl, "Server error. Please try again.", "error");
    clearTable();
  }
}

function renderTable(rows) {
  const tbody = document.getElementById("summaryTableBody");
  const countEl = document.getElementById("resultCount");

  countEl.textContent = `${rows.length} record${rows.length !== 1 ? "s" : ""} found`;

  if (rows.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" class="table-placeholder">
          <div class="placeholder-content">
            <div class="placeholder-icon">🔍</div>
            <p>No records match your filter criteria.</p>
          </div>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = rows.map((row) => {
    const statusClass = {
      COMPLETED: "status-completed",
      PACKING: "status-packing",
      CANCELLED: "status-cancelled",
    }[row.status] || "";

    const orderDate = row.orderDatetime
      ? new Date(row.orderDatetime).toLocaleDateString("en-SG", {
          day: "2-digit", month: "short", year: "numeric",
        })
      : "–";

    const totalAmount = row.totalAmount
      ? `S$${parseFloat(row.totalAmount).toFixed(2)}`
      : "–";

    const unitPrice = row.unitPrice
      ? `S$${parseFloat(row.unitPrice).toFixed(2)}`
      : "–";

    return `
      <tr>
        <td><strong>#${row.orderId || row.id || "–"}</strong></td>
        <td>${orderDate}</td>
        <td>${row.customerName || row.username || "–"}</td>
        <td>${row.gender === "M" ? "Male" : row.gender === "F" ? "Female" : "–"}</td>
        <td>${row.productName || row.name || "–"}</td>
        <td>
          <span class="status-badge" style="background:#e8f4fd;color:#1b6ca8;">
            ${row.productType || "–"}
          </span>
        </td>
        <td>${row.quantity || "–"}</td>
        <td>${unitPrice}</td>
        <td><strong>${totalAmount}</strong></td>
        <td>
          <span class="status-badge ${statusClass}">
            ${row.status || "–"}
          </span>
        </td>
      </tr>`;
  }).join("");
}

function updateStatCards(rows) {
  const completedRows = rows.filter((r) => r.status === "COMPLETED");

  const totalOrders = new Set(rows.map((r) => r.orderId || r.id)).size;
  const totalRevenue = completedRows.reduce((sum, r) => sum + parseFloat(r.totalAmount || 0), 0);
  const totalCustomers = new Set(rows.map((r) => r.customerName || r.username)).size;
  const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  document.getElementById("statTotalOrders").textContent = totalOrders;
  document.getElementById("statTotalRevenue").textContent = `S$${totalRevenue.toFixed(2)}`;
  document.getElementById("statTotalCustomers").textContent = totalCustomers;
  document.getElementById("statAvgOrder").textContent = `S$${avgOrder.toFixed(2)}`;
}

function showLoadingRows() {
  const tbody = document.getElementById("summaryTableBody");
  const countEl = document.getElementById("resultCount");
  countEl.textContent = "Loading...";

  tbody.innerHTML = Array(6).fill(0).map(() => `
    <tr class="loading-row">
      ${Array(10).fill(0).map(() => `
        <td><div class="loading-cell" style="width:${60 + Math.random() * 40}%"></div></td>
      `).join("")}
    </tr>`).join("");
}

function clearTable() {
  const tbody = document.getElementById("summaryTableBody");
  const countEl = document.getElementById("resultCount");
  countEl.textContent = "No data loaded";
  tbody.innerHTML = `
    <tr>
      <td colspan="10" class="table-placeholder">
        <div class="placeholder-content">
          <div class="placeholder-icon">📊</div>
          <p>Use the filters above and click <strong>Search</strong> to load data.</p>
        </div>
      </td>
    </tr>`;

  // Reset stat cards
  ["statTotalOrders", "statTotalRevenue", "statTotalCustomers", "statAvgOrder"]
    .forEach((id) => { document.getElementById(id).textContent = "–"; });
}

function resetFilters() {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  document.getElementById("startDate").value = formatDate(sixMonthsAgo);
  document.getElementById("endDate").value = formatDate(today);
  document.getElementById("productCategory").value = "";
  document.getElementById("sortBy").value = "order_date";
  document.getElementById("genderFilter").value = "";
  document.getElementById("statusFilter").value = "";

  clearTable();
  document.getElementById("message").className = "message hidden";
}

function exportCSV() {
  const table = document.getElementById("summaryTable");
  const rows = table.querySelectorAll("tr");
  if (rows.length <= 1) {
    alert("No data to export. Please search first.");
    return;
  }

  const csvRows = [];
  rows.forEach((row) => {
    const cols = row.quer
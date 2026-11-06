// Basic instructions are provided to guide students.
// Students are required to implement any additional code deem necessary
// for their app to work.
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

// =============================================================
// TODO: Implement this function to load the sales order summary
// This function should:
// 1. Read the filter values from the form
// 2. Send a GET request to the API endpoint with the filters
// 3. Display the results in the table 
// 4. Update the stat cards with the summary data
// =============================================================
async function loadSummary() {
// TODO: Students to implement this function  
}

// =============================================================
// TODO: Implement this function to render the table
// This function should:
// 1. Accept an array of rows as a parameter
// 2. Loop through the rows and generate HTML table rows
// 3. Dispaly the rows in the table body
// =============================================================
function renderTable(rows) {
// TODO: Students to implement this function
}

// =============================================================
// TODO: Implement this function to update the stat cards
// This function should:
// 1. Accept an array of rows as a parameter
// 2. Calculate the total orders, total revenue, total customers
//    and average order value 
// 3. Display the values in the stat cards
// =============================================================
function updateStatCards(rows) {
// TODO: Students to implement this function
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
    .forEach((id) => {
      document.getElementById(id).textContent = "–";
    });
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

// =============================================================
// TODO: Implement this function to export the table as CSV
// This function should:
// 1. Read the table rows from the HTML table
// 2. Convert the rows to CSV format
// 3. Trigger a file download
// =============================================================
function exportCSV() {
// Optional: Students to implement this function 
}

function showMessage(el, msg, type) {
  el.textContent = msg;
  el.className = `message ${type}`;
}

function logout() {
  localStorage.clear();
  window.location.href = "/auth/login";
}
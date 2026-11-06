// public/auth/login/script.js

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const msgEl = document.getElementById("message");
  const submitBtn = e.target.querySelector("button[type='submit']");

  if (!username || !password) {
    showMessage(msgEl, "Please enter both username and password.", "error");
    return;
  }

  // Disable button to prevent double submit
  submitBtn.disabled = true;
  submitBtn.textContent = "Logging in...";

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    // Check if response is ok
    if (!res.ok && res.status !== 401) {
      showMessage(msgEl, `Server error: ${res.status} ${res.statusText}`, "error");
      submitBtn.disabled = false;
      submitBtn.textContent = "Login";
      return;
    }

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("memberId", data.member.id);
      localStorage.setItem("username", data.member.username);
      localStorage.setItem("role", data.member.role);

      showMessage(msgEl, "Login successful! Redirecting...", "success");

      setTimeout(() => {
        if (parseInt(data.member.role) === 1) {
          window.location.href = "/admin/dashboard/salesOrderSummary";
        } else {
          window.location.href = "/product/retrieve";
        }
      }, 1000);

    } else {
      showMessage(msgEl, data.message || "Login failed. Please try again.", "error");
      submitBtn.disabled = false;
      submitBtn.textContent = "Login";
    }

  } catch (err) {
    console.error("Login error:", err);
    showMessage(msgEl, "Cannot connect to server. Is the app running?", "error");
    submitBtn.disabled = false;
    submitBtn.textContent = "Login";
  }
});

function showMessage(el, msg, type) {
  el.textContent = msg;
  el.className = `message ${type}`;
}

function copyText(value, fieldId) {
  document.getElementById(fieldId).value = value;
  navigator.clipboard.writeText(value).catch(() => {
    const el = document.createElement("textarea");
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  });
}
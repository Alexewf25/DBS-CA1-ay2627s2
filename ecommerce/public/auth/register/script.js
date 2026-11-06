function showMessage(msg, type) {
  const el = document.getElementById("message");
  el.textContent = msg;
  el.className = "message " + type;
}

document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email    = document.getElementById("email").value.trim();
  const dob      = document.getElementById("dob").value;
  const gender   = document.getElementById("gender").value;
  const password = document.getElementById("password").value;
  const btn      = document.getElementById("registerBtn");

  console.log("=== REGISTER FORM SUBMIT ===");
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("DOB:", dob);
  console.log("Gender:", gender);

  // Front-end validation
  if (!username || !email || !dob || !gender || !password) {
    showMessage("All fields are required.", "error");
    return;
  }

  if (password.length < 8) {
    showMessage("Password must be at least 8 characters.", "error");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Registering...";

  try {
    console.log("Sending POST to /api/auth/register");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username : username,
        email    : email,
        dob      : dob,
        password : password,
        gender   : gender
      })
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);

    if (data.success) {
      showMessage(
        "Account created successfully! Redirecting to login...",
        "success"
      );
      setTimeout(function () {
        window.location.href = "/auth/login";
      }, 2000);
    } else {
      showMessage(data.message || "Registration failed. Please try again.", "error");
      btn.disabled = false;
      btn.textContent = "Register";
    }

  } catch (err) {
    console.error("Register error:", err);
    showMessage(
      "Cannot reach server. Please check that the app is running.",
      "error"
    );
    btn.disabled = false;
    btn.textContent = "Register";
  }
});
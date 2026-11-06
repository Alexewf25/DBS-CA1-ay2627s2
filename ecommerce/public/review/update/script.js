// TODO: Implement the code for the review update functionality
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/auth/login";
        return;
    }
    const username = localStorage.getItem("username") || "User";
    document.getElementById("navUsername").textContent = username;
});
// TODO: Implement the necessary code to retrieve and
// display all reviews for a product, along with their comments.
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/auth/login";
        return;
    }
    const username = localStorage.getItem("username") || "User";
    document.getElementById("navUsername").textContent = username;
});

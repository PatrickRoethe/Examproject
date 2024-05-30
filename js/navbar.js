// Function to check if the user is logged in (i.e., has an API key)
function isLoggedIn() {
  return localStorage.getItem("apiKey") !== null;
}

// Function to show or hide login/register links based on login status
function updateNavbar() {
  if (isLoggedIn()) {
    // User is logged in, show the logout link and the create/edit post links
    document.getElementById("logout-link").style.display = "block";
    document.getElementById("create-post-link").style.display = "block";
    document.getElementById("edit-post-link").style.display = "block";
  } else {
    // User is not logged in, hide the create/edit post links and the logout link
    document.getElementById("logout-link").style.display = "none";
    document.getElementById("create-post-link").style.display = "none";
    document.getElementById("edit-post-link").style.display = "none";
  }
}

// Function to log out the user
function logout() {
  localStorage.removeItem("apiKey");
  localStorage.removeItem("accessToken");
  window.location.reload();
}

// Add event listener to the logout link
document.getElementById("logout-link").addEventListener("click", logout);

// Call updateNavbar on page load
document.addEventListener("DOMContentLoaded", updateNavbar);

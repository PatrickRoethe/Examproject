function isLoggedIn() {
  return localStorage.getItem("apiKey") !== null;
}

function updateNavbar() {
  if (isLoggedIn()) {
    document.getElementById("logout-link").style.display = "block";
    document.getElementById("create-post-link").style.display = "block";
    document.getElementById("edit-post-link").style.display = "block";
  } else {
    document.getElementById("logout-link").style.display = "none";
    document.getElementById("create-post-link").style.display = "none";
    document.getElementById("edit-post-link").style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("apiKey");
  localStorage.removeItem("accessToken");
  window.location.reload();
}

function highlightCurrentPage() {
  const links = document.querySelectorAll(".navbar a");
  const currentUrl = window.location.href;

  links.forEach((link) => {
    if (link.href === currentUrl) {
      link.classList.add("active");
    }
  });
}

document.getElementById("logout-link").addEventListener("click", logout);

document.addEventListener("DOMContentLoaded", () => {
  updateNavbar();
  highlightCurrentPage();
});

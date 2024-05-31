// Function to fetch latest posts and display them on the homepage
async function fetchAndDisplayLatestPosts() {
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/blog/posts/Patrick"
    );
    const data = await response.json();

    if (response.ok) {
      const postGrid = document.getElementById("postGrid");
      postGrid.innerHTML = ""; // Clear existing posts

      // Select carousel items for updating
      const carouselItems = [0, 1, 2].map((i) =>
        document.getElementById(`carousel-item-${i}`)
      );
      // Update carousel items with the latest three posts
      data.data.slice(0, 3).forEach((post, index) => {
        const carouselItem = carouselItems[index];
        carouselItem.innerHTML = `
                <img src="${
                  post.media
                    ? post.media.url
                    : "https://via.placeholder.com/800x400"
                }" alt="${post.title}">
                <div class="carousel-caption">
                  <h3>${post.title}</h3>
                  <button class="carousel-button" onclick="redirectToPostPage('${
                    post.id
                  }')">Read More</button>
                </div>
              `;
      });

      // Update the post grid with the latest 12 posts
      data.data.slice(0, 12).forEach((post) => {
        const postThumbnail = document.createElement("article");
        postThumbnail.classList.add("post-thumbnail");
        // Event listener to show post details in popup/modal
        postThumbnail.addEventListener("click", () => {
          redirectToPostPage(post.id);
        });

        const image = document.createElement("img");
        image.src = post.media
          ? post.media.url
          : "https://via.placeholder.com/200";
        image.alt = post.title;

        const title = document.createElement("p");
        title.classList.add("post-title");
        title.textContent = post.title;

        postThumbnail.appendChild(image);
        postThumbnail.appendChild(title);
        postGrid.appendChild(postThumbnail);
      });

      // Initialize the carousel functionality
      initializeCarousel();
    } else {
      console.error("Failed to fetch posts:", data.error.message);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Carousel functionality
function initializeCarousel() {
  let currentSlide = 0;
  const totalSlides = 3; // Total number of slides in the carousel
  const carouselItems = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".dot");

  document.getElementById("prev-button").addEventListener("click", () => {
    carouselItems[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    carouselItems[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  });

  document.getElementById("next-button").addEventListener("click", () => {
    carouselItems[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % totalSlides;
    carouselItems[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  });

  // Activate the first slide initially
  carouselItems[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");

  // Add event listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      carouselItems[currentSlide].classList.remove("active");
      dots[currentSlide].classList.remove("active");
      currentSlide = index;
      carouselItems[currentSlide].classList.add("active");
      dots[currentSlide].classList.add("active");
    });
  });
}

// Function to redirect to post/index.html with post ID
function redirectToPostPage(postId) {
  window.location.href = `html/post/index.html?id=${postId}`;
}

// Call the function to fetch and display latest posts when the page loads
window.addEventListener("DOMContentLoaded", fetchAndDisplayLatestPosts);

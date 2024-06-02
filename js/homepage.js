async function fetchAndDisplayLatestPosts() {
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/blog/posts/Patrick"
    );
    const data = await response.json();

    if (response.ok) {
      const postGrid = document.getElementById("postGrid");
      postGrid.innerHTML = "";

      const carouselItems = [0, 1, 2].map((i) =>
        document.getElementById(`carousel-item-${i}`)
      );

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

      data.data.slice(0, 12).forEach((post) => {
        const postThumbnail = document.createElement("article");
        postThumbnail.classList.add("post-thumbnail");

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

      initializeCarousel();
    } else {
      console.error("Failed to fetch posts:", data.error.message);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function initializeCarousel() {
  let currentSlide = 0;
  const totalSlides = 3;
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

  carouselItems[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");

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

function redirectToPostPage(postId) {
  window.location.href = `html/post/index.html?id=${postId}`;
}

window.addEventListener("DOMContentLoaded", fetchAndDisplayLatestPosts);

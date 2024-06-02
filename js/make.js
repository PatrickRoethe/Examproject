function storeTokens(accessToken, apiKey) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("apiKey", apiKey);
}

function getTokens() {
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");
  return { accessToken, apiKey };
}

const createPostForm = document.getElementById("createPostForm");

createPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const tags = document
    .getElementById("tags")
    .value.split(",")
    .map((tag) => tag.trim());
  const mediaUrl = document.getElementById("mediaUrl").value;
  const mediaAlt = document.getElementById("mediaAlt").value;

  const requestBody = {
    title,
    body,
    tags,
  };

  if (mediaUrl && mediaAlt) {
    requestBody.media = {
      url: mediaUrl,
      alt: mediaAlt,
    };
  }

  try {
    const { accessToken, apiKey } = getTokens();

    if (!accessToken || !apiKey) {
      alert("Please log in to create a blog post");
      return;
    }

    const baseURL = "https://v2.api.noroff.dev";
    const response = await fetch(`${baseURL}/blog/posts/Patrick`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      alert("Blog post created successfully!");
      createPostForm.reset();
    } else {
      const errorData = await response.json();
      alert("Failed to create blog post: " + errorData.error.message);
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    alert("An unexpected error occurred while creating the blog post.");
  }
});

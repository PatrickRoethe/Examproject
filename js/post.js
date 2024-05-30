async function fetchAndDisplayPost() {
  const postId = new URLSearchParams(window.location.search).get("id");
  if (!postId) {
    document.body.innerHTML = "<p>Post ID not found in the URL.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/Patrick/${postId}`
    );
    const postData = await response.json();

    if (response.ok) {
      document.getElementById("postTitle").textContent = postData.data.title;
      document.getElementById("postMeta").textContent = `By ${
        postData.data.author.name
      } on ${new Date(postData.data.created).toLocaleDateString()}`;
      document.getElementById("postImage").src = postData.data.media
        ? postData.data.media.url
        : "https://via.placeholder.com/800";
      document.getElementById("postContent").innerHTML =
        postData.data.body.replace(/\n/g, "<p></p>");
    } else {
      document.body.innerHTML = "<p>Failed to fetch post details.</p>";
    }
  } catch (error) {
    document.body.innerHTML =
      "<p>An error occurred while fetching post details.</p>";
  }
}

window.addEventListener("DOMContentLoaded", fetchAndDisplayPost);

function storeTokens(accessToken, apiKey) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("apiKey", apiKey);
}

function getTokens() {
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");
  return { accessToken, apiKey };
}

async function deletePost(postId) {
  try {
    const { accessToken, apiKey } = getTokens();

    if (!accessToken || !apiKey) {
      alert("Please log in to delete the blog post");
      return;
    }

    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/Patrick/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      }
    );

    if (response.status === 204) {
      alert("Post deleted successfully!");
      fetchAndPopulatePosts();
      document.getElementById("title").value = "";
    } else {
      console.error("Failed to delete post:", response.statusText);
      alert("Failed to delete post. Please try again later.");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("An unexpected error occurred while deleting the post.");
  }
}

const editPostForm = document.getElementById("editPostForm");
const selectPost = document.getElementById("selectPost");
const deleteButton = document.getElementById("deleteButton");

async function fetchAndPopulatePosts() {
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/blog/posts/Patrick"
    );
    const data = await response.json();

    if (response.ok) {
      selectPost.innerHTML = "";

      data.data.forEach((post) => {
        const option = document.createElement("option");
        option.value = post.id;
        option.textContent = post.title;
        selectPost.appendChild(option);
      });
    } else {
      console.error("Failed to fetch posts:", data.error.message);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

async function fetchPostDetails(postId) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/Patrick/${postId}`
    );
    const postData = await response.json();

    if (response.ok) {
      document.getElementById("title").value = postData.data.title;
      document.getElementById("body").value = postData.data.body || "";
      document.getElementById("tags").value = postData.data.tags.join(", ");
      document.getElementById("mediaUrl").value = postData.data.media
        ? postData.data.media.url
        : "";
      document.getElementById("mediaAlt").value = postData.data.media
        ? postData.data.media.alt
        : "";
    } else {
      console.error("Failed to fetch post details:", postData.error.message);
    }
  } catch (error) {
    console.error("Error fetching post details:", error);
  }
}

window.addEventListener("DOMContentLoaded", fetchAndPopulatePosts);

selectPost.addEventListener("change", (event) => {
  const postId = event.target.value;
  fetchPostDetails(postId);
});

editPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(editPostForm);
  const { selectPost, title, body, tags, mediaUrl, mediaAlt } =
    Object.fromEntries(formData);
  const postId = selectPost;

  const requestBody = {
    title,
    body,
    tags: tags.split(",").map((tag) => tag.trim()),
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
      alert("Please log in to update the blog post");
      return;
    }

    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/Patrick/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      alert("Blog post updated successfully!");
      editPostForm.reset();
      fetchAndPopulatePosts();
    } else {
      const errorData = await response.json();
      console.error("Failed to update blog post:", errorData);
      alert(
        "Failed to update blog post: " +
          (errorData.error?.message || "Unknown error")
      );
    }
  } catch (error) {
    console.error("Error updating blog post:", error);
    alert(
      "An unexpected error occurred while updating the blog post: " +
        error.message
    );
  }
});

deleteButton.addEventListener("click", () => {
  const postId = selectPost.value;
  deletePost(postId);
  editPostForm.reset();
});

const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registrationForm);
  const requestBody = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    bio: formData.get("bio"),
    avatar: {
      url: formData.get("avatarUrl"),
      alt: formData.get("avatarAlt"),
    },
  };

  // Remove empty avatar properties
  if (!requestBody.avatar.url) delete requestBody.avatar.url;
  if (!requestBody.avatar.alt) delete requestBody.avatar.alt;

  // Remove empty avatar object if no properties are set
  if (Object.keys(requestBody.avatar).length === 0) delete requestBody.avatar;

  try {
    // Use the API key if required
    const apiKey = localStorage.getItem("apiKey");
    const headers = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["X-Noroff-API-Key"] = apiKey;
    }

    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      alert("Registration successful!");
      registrationForm.reset();
    } else {
      const errorData = await response.json();
      if (errorData && errorData.error && errorData.error.message) {
        alert("Registration failed: " + errorData.error.message);
      } else {
        alert("Registration failed: Unknown error");
      }
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An unexpected error occurred during registration.");
  }
});

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const requestBody = Object.fromEntries(formData);

  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const userData = await response.json();
      const accessToken = userData.data.accessToken;

      const apiKeyResponse = await fetch(
        "https://v2.api.noroff.dev/auth/create-api-key",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (apiKeyResponse.ok) {
        const apiKeyData = await apiKeyResponse.json();
        const apiKey = apiKeyData.data.key;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("apiKey", apiKey);

        alert(
          "Login successful! Welcome, " +
            userData.data.name +
            ". API key created: " +
            apiKey
        );
      } else {
        alert("Failed to create API key");
      }
    } else {
      const errorData = await response.json();
      alert("Login failed: " + errorData.error.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An unexpected error occurred during login.");
  }
});

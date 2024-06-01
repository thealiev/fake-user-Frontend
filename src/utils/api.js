const baseURL = "https://fake-user-backend.onrender.com";

export const getUserData = async (
  region,
  page,
  pageSize,
  errorAmount,
  seed = 1,
  additionalDataCount = 0
) => {
  try {
    const response = await fetch(`${baseURL}/api/userData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        region,
        page,
        pageSize,
        errorAmount,
        seed,
        additionalDataCount,
      }),
    });
    if (!response.ok) {
      throw new Error("Server responded with an error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

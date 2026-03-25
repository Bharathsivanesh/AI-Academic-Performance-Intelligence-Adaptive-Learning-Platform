import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// 🔁 REFRESH TOKEN FUNCTION
const refreshAccessToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh_token");

    const response = await axios.post(
      `${BASE_URL}/api/token/refresh/`,
      { refresh },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const newAccess = response.data.access;

    // ✅ SAVE NEW ACCESS TOKEN
    localStorage.setItem("access_token", newAccess);

    return newAccess;
  } catch (error) {
    console.error("❌ Refresh token failed", error);

    // ❌ Logout if refresh fails
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";

    throw error;
  }
};

export const apiService = async ({
  endpoint,
  method = "GET",
  payload = {},
  onSuccess = () => {},
  onError = () => {},
  headers = {},
  fullUrl = false,
}) => {
  const url = fullUrl ? endpoint : `${BASE_URL}${endpoint}`;
  const isFormData = payload instanceof FormData;

  let token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  try {
    const response = await axios({
      url,
      method,
      data: payload,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
    });

    onSuccess(response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);

    const status = error.response?.status;
    const message = error.response?.data?.messages?.[0]?.message || "";

    // 🔥 CHECK TOKEN EXPIRED
    if (status === 401 && message === "Token is expired") {
      try {
        console.log("🔄 Token expired, refreshing...");

        // 1️⃣ Get new access token
        const newAccessToken = await refreshAccessToken();

        // 2️⃣ Retry original request with new token
        const retryResponse = await axios({
          url,
          method,
          data: payload,
          headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            accept: "application/json",
            Authorization: `Bearer ${newAccessToken}`,
            ...headers,
          },
        });

        onSuccess(retryResponse.data);
        return retryResponse.data;
      } catch (refreshError) {
        onError(refreshError);
        throw refreshError;
      }
    }

    // ❌ Other errors
    onError(error);
    throw error;
  }
};

import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const apiService = async ({
  endpoint,
  method = "GET",
  payload = {},
  onSuccess = () => {},
  onError = () => {},
  headers = {},
  fullUrl = false,
}) => {
  try {
    const url = fullUrl ? endpoint : `${BASE_URL}${endpoint}`;
    const isFormData = payload instanceof FormData;

    // ✅ GET TOKEN FROM LOCAL STORAGE
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    const response = await axios({
      url,
      method,
      data: payload,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        accept: "application/json",

        // ✅ ADD AUTH HEADER
        ...(token && { Authorization: `Bearer ${token}` }),

        ...headers,
      },
    });

    onSuccess(response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);

    // ✅ HANDLE TOKEN EXPIRE (OPTIONAL BUT IMPORTANT)
    if (error.response?.status === 401) {
      console.log("Token expired or unauthorized");

      // Optional: clear storage & redirect
      localStorage.removeItem("access_token");
      // window.location.href = "/login";
    }

    onError(error);
    throw error;
  }
};
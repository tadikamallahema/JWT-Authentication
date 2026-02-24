// utils/checkTokenExpiry.js
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) {
    console.log("⚠️ No token found");
    return true;
  }

  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    console.log("❌ Token Expired (Frontend Check)");
    console.log("Expiry Time:", new Date(decoded.exp * 1000));
    return true;
  }

  console.log("✅ Token Valid");
  return false;
};
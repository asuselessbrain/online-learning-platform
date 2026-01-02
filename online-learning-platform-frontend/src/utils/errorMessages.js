// Maps Firebase and backend/axios errors to user-friendly messages

export function getFirebaseErrorMessage(error) {
  if (!error) return "An unexpected error occurred.";
  const code = error.code || "unknown";
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 8 characters with a number, uppercase and symbol.";
    case "auth/user-not-found":
      return "No account found for this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was closed before completion.";
    case "auth/popup-blocked":
      return "Popup was blocked. Allow popups and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      // Fallback to message if available
      return error.message || "Authentication error. Please try again.";
  }
}

export function getBackendErrorMessage(error) {
  if (!error) return "An unexpected server error occurred.";
  const messageFromResponse = error?.response?.data?.message || error?.response?.data?.error || error?.message;
  if (!messageFromResponse) return "Failed to process your request.";

  // Normalize common Mongo/Mongoose/validation messages
  if (typeof messageFromResponse === "string") {
    if (messageFromResponse.includes("duplicate key") || messageFromResponse.includes("E11000")) {
      return "Account already exists with this email.";
    }
    if (messageFromResponse.toLowerCase().includes("validation")) {
      return "Submitted data is invalid. Please check the fields.";
    }
    return messageFromResponse;
  }

  // If it's an object, try to stringify keys
  try {
    return JSON.stringify(messageFromResponse);
  } catch {
    return "Server error occurred.";
  }
}

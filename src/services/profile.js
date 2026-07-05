import axios from "axios";

const API_URL = "http://localhost:5000/api/profile";

// Get JWT Token
const getToken = () => {
  return localStorage.getItem("token");
};

// Common Headers
const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// =============================
// Get Profile
// =============================
export const getProfile = async () => {
  try {
    const response = await axios.get(
      API_URL,
      getHeaders()
    );

    return response.data;

  } catch (error) {

    console.error(error);
    throw error;

  }
};

// =============================
// Update Profile
// =============================
export const updateProfile = async (data) => {
  try {

    const response = await axios.put(
      API_URL,
      data,
      getHeaders()
    );

    return response.data;

  } catch (error) {

    console.error(error);
    throw error;

  }
};

// =============================
// Change Password
// =============================
export const changePassword = async (data) => {
  try {

    const response = await axios.put(
      `${API_URL}/password`,
      data,
      getHeaders()
    );

    return response.data;

  } catch (error) {

    console.error(error);
    throw error;

  }
};

// =============================
// Upload Profile Image
// =============================
export const uploadProfileImage = async (file) => {

  try {

    const formData = new FormData();

    formData.append("image", file);

    const response = await axios.post(
      `${API_URL}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;

  } catch (error) {

    console.error(error);
    throw error;

  }

};
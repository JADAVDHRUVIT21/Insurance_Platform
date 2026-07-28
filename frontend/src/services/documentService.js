import api from "./api";

// Get all doctors
export const getDoctors = async () => {
  try {
    const response = await api.get("/doctors/");
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

// Get single doctor by ID
export const getDoctor = async (id) => {
  try {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching doctor ${id}:`, error);
    throw error;
  }
};

// Create new doctor
export const createDoctor = async (doctorData) => {
  try {
    const response = await api.post("/doctors/", doctorData);
    return response.data;
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw error;
  }
};

// Update doctor
export const updateDoctor = async (id, doctorData) => {
  try {
    const response = await api.put(`/doctors/${id}`, doctorData);
    return response.data;
  } catch (error) {
    console.error(`Error updating doctor ${id}:`, error);
    throw error;
  }
};

// Delete doctor
export const deleteDoctor = async (id) => {
  try {
    const response = await api.delete(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting doctor ${id}:`, error);
    throw error;
  }
};
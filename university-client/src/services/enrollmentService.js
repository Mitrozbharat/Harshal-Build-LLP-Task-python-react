import api from "./api";

export const getEnrollments = () => api.get("/enrollments/");
export const createEnrollment = (data) => api.post("/enrollments/", data);
export const deleteEnrollment = (id) => api.delete(`/enrollments/${id}`);


import api from "./api";

export const createEnrollment = (student_id, subject_id) =>
    api.post(`/enrollments/?student_id=${student_id}&subject_id=${subject_id}`);

export const getEnrollments = () =>
    api.get('/enrollments/');

export const deleteEnrollment = (id) =>
    api.delete(`/enrollments/${id}`);


export const UpdateEnrollment = (id) =>
    api.put(`/enrollments/${id}`);

export const getunenrolledStudets = () => api.get('/enrollments/unenrolled');

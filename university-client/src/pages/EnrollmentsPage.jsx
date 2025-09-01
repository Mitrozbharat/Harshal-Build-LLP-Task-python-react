import { useEffect, useState } from "react";
import {
    createEnrollment, deleteEnrollment, getEnrollments
} from "../services/enrollmentService";
import { getStudents } from "../services/studentService";
import { getSubjects } from "../services/subjectService";


function EnrollmentsPage() {
    const [enrollments, setEnrollments] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [form, setForm] = useState({ studentId: "", subjectId: "" });
    const [editingId, setEditingId] = useState(null); // null = create mode, not edit

    useEffect(() => {
        fetchEnrollments();
        fetchStudents();
        fetchSubjects();
    }, []);

    const fetchEnrollments = async () => {
        const res = await getEnrollments();
        setEnrollments(res.data);
    };

    const fetchStudents = async () => {
        const res = await getStudents();
        setStudents(res.data);
    };

    const fetchSubjects = async () => {
        const res = await getSubjects();
        setSubjects(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);

        try {

            if (editingId) {
                // ✅ Update student
                await UpdateEnrollment(form);
                setEditId(null);
                alert("Enrollment updated successfully ✅");
            } else {

                await createEnrollment(
                    Number(form.studentId),
                    Number(form.subjectId)
                );
                setForm({ studentId: "", subjectId: "" });
                fetchEnrollments();
                setEditingId(null);
                alert("Enrollment created successfully ✅");
            }



        } catch (error) {
            // ✅ Handle API error response
            if (error.response && error.response.data) {
                const apiError =
                    error.response.data.detail || JSON.stringify(error.response.data);
                alert(`Error: ${apiError}`);
            } else {
                alert("Unexpected error occurred. Please try again.");
            }

            console.error("Enrollment error:", error);
        }
    };


    const handleUpdate = (enrollment) => {

        setEditingId(enrollment.id);
        setForm({
            studentId: enrollment.student_id.toString(),
            subjectId: enrollment.subject_id.toString()
        });


    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this enrollment?")) {
            await deleteEnrollment(id);
            fetchEnrollments();
        }
    };

    return (
        <div style={{ maxWidth: "1400px", margin: "40px auto", padding: "20px" }}>
            <div
                style={{
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                    border: "none",
                    borderRadius: "16px",
                    background: "#fff",
                    padding: "30px",
                }}
            >
                <h1
                    style={{
                        marginBottom: "30px",
                        textAlign: "center",
                        color: "#0d6efd",
                        fontWeight: "bold",
                    }}
                >
                    Enrollments
                </h1>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        marginBottom: "30px",
                        alignItems: "flex-end",
                    }}
                >
                    <div style={{ flex: "1 1 40%" }}>
                        <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>
                            Student
                        </label>
                        <select
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                            }}
                            value={form.studentId}
                            name="studentId"
                            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                            required
                        >
                            <option value="">Select Student</option>
                            {students.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ flex: "1 1 40%" }}>
                        <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>
                            Subject
                        </label>
                        <select
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                            }}
                            value={form.subjectId}
                            name="subjectId"
                            onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
                            required
                        >
                            <option value="">Select Subject</option>
                            {subjects.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ flex: "1 1 15%", display: "flex", justifyContent: "center" }}>
                        <button
                            type="submit"
                            style={{
                                background: "#0d6efd",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                padding: "10px 20px",
                                fontWeight: "600",
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            {editingId ? "Update" : "Enroll"}
                        </button>
                    </div>
                </form>

                {/* Data Table */}
                <div style={{ overflowX: "auto" }}>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#212529", color: "#fff", textAlign: "center" }}>
                                <th style={{ padding: "12px" }}>#</th>
                                <th style={{ padding: "12px" }}>Student</th>
                                <th style={{ padding: "12px" }}>Subject</th>
                                <th style={{ padding: "12px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrollments.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", color: "#6c757d", padding: "20px" }}>
                                        No enrollments found.
                                    </td>
                                </tr>
                            ) : (
                                enrollments.map((e, index) => {
                                    const student = students.find((s) => s.id === e.student_id);
                                    const subject = subjects.find((s) => s.id === e.subject_id);

                                    return (
                                        <tr
                                            key={e.id}
                                            style={{
                                                borderBottom: "1px solid #dee2e6",
                                                textAlign: "center",
                                            }}
                                        >
                                            <td style={{ padding: "12px", fontWeight: "600" }}>{index + 1}</td>
                                            <td style={{ padding: "12px" }}>{student ? student.name : "N/A"}</td>
                                            <td style={{ padding: "12px" }}>{subject ? subject.title : "N/A"}</td>
                                            <td style={{ padding: "12px" }}>
                                                <button
                                                    onClick={() => handleUpdate(e)}
                                                    style={{
                                                        background: "#ffc107",
                                                        border: "none",
                                                        padding: "6px 12px",
                                                        borderRadius: "6px",
                                                        marginRight: "8px",
                                                        cursor: "pointer",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(e.id)}
                                                    style={{
                                                        background: "#dc3545",
                                                        border: "none",
                                                        padding: "6px 12px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "14px",
                                                        color: "#fff",
                                                    }}
                                                >
                                                    ❌ Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    );
}

export default EnrollmentsPage;

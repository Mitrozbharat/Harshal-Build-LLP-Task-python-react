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
        <div className="container mt-4">
            <h1 className="mb-4">Enrollments</h1>

            {/* Form */}
            <form className="row g-3 mb-4" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-5 col-lg-6">
                        <select

                            className=" form-control "
                            value={form.studentId}
                            name="studentId"
                            onChange={(e) =>
                                setForm({ ...form, studentId: e.target.value })
                            }
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

                    <div className="col-md-5 col-lg-6">
                        <select

                            className="form-select from-control"
                            value={form.subjectId}
                            name="subjectId"
                            onChange={(e) =>
                                setForm({ ...form, subjectId: e.target.value })
                            }
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
                </div>

                <div className="col-md-2 d-grid">
                    <button className="btn btn-primary" type="submit">
                        {editingId ? "Update" : "Enroll"}
                    </button>
                </div>
            </form>

            {/* Data Table */}
            <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark text-center">
                    <tr>
                        <th>#</th>
                        <th>Student</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center text-muted">
                                No enrollments found.
                            </td>
                        </tr>
                    ) : (
                        enrollments.map((e, index) => {
                            const student = students.find(
                                (s) => s.id === e.student_id
                            );
                            const subject = subjects.find(
                                (s) => s.id === e.subject_id
                            );

                            return (
                                <tr key={e.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{student ? student.name : "N/A"}</td>
                                    <td>{subject ? subject.title : "N/A"}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => handleUpdate(e)}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(e.id)}
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
    );
}

export default EnrollmentsPage;

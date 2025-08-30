import { useEffect, useState } from "react";
import { createEnrollment, deleteEnrollment, getEnrollments } from "../services/enrollmentService";
import { getStudents } from "../services/studentService";
import { getSubjects } from "../services/subjectService";

function EnrollmentsPage() {
    const [enrollments, setEnrollments] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [form, setForm] = useState({ student_id: "", subject_id: "" });

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
        await createEnrollment(form);
        setForm({ student_id: "", subject_id: "" });
        fetchEnrollments();
    };

    const handleDelete = async (id) => {
        await deleteEnrollment(id);
        fetchEnrollments();
    };

    return (
        <div>
            <h1>Enrollments</h1>

            <form onSubmit={handleSubmit}>
                <select
                    value={form.student_id}
                    onChange={(e) => setForm({ ...form, student_id: e.target.value })}
                >
                    <option value="">Select Student</option>
                    {students.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>

                <select
                    value={form.subject_id}
                    onChange={(e) => setForm({ ...form, subject_id: e.target.value })}
                >
                    <option value="">Select Subject</option>
                    {subjects.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.title}
                        </option>
                    ))}
                </select>

                <button type="submit">Enroll</button>
            </form>

            <ul>
                {enrollments.map((e) => (
                    <li key={e.id}>
                        Student ID: {e.student_id} → Subject ID: {e.subject_id}
                        <button onClick={() => handleDelete(e.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EnrollmentsPage;

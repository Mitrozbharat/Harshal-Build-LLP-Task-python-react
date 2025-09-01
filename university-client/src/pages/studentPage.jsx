import { useEffect, useState } from "react";
import { createStudent, deleteStudent, getStudents, updateStudent } from "../services/studentService";
import styles from "./FromTable.module.css";

function StudentsPage() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ name: "", email: "" });
    const [editId, setEditId] = useState(null); // ✅ Track student being edited

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const res = await getStudents();
        setStudents(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                // ✅ Update student
                await updateStudent(editId, form);
                setEditId(null);
                alert("Student updated successfully ✅");
            } else {
                // ✅ Create new student
                await createStudent(form);
                alert("Student created successfully ✅");
            }

            setForm({ name: "", email: "" });
            fetchStudents();
        } catch (error) {
            // ✅ Catch API errors
            if (error.response && error.response.data) {
                const apiError =
                    error.response.data.detail || JSON.stringify(error.response.data);
                alert(`Error: ${apiError}`);
                setForm({ name: "", email: "" });
            } else {
                alert("Unexpected error occurred. Please try again.");
            }
            console.error("Student API error:", error);
        }
    };


    const handleDelete = async (id) => {
        await deleteStudent(id);
        fetchStudents();
    };

    const handleUpdate = (student) => {
        setForm({ name: student.name, email: student.email });
        setEditId(student.id);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1 className={styles.heading}>Students</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <button className={styles.button} type="submit">
                    {editId ? "Update Student" : "Add Student"}
                </button>
            </form>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }} className={styles.th}>Name</th>
                        <th style={{ textAlign: "center" }} className={styles.th}>Email</th>
                        <th style={{ textAlign: "center" }} className={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((s) => (
                        <tr key={s.id}>
                            <td className={styles.td}>{s.name}</td>
                            <td className={styles.td}>{s.email}</td>
                            <td className={styles.td}>
                                <button
                                    className="btn btn-warning btn-sm updateBtn"
                                    onClick={() => handleUpdate(s)}
                                >
                                    Update
                                </button>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => handleDelete(s.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentsPage;

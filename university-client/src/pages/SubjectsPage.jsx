import { useEffect, useState } from "react";
import { createSubject, deleteSubject, getSubjects, updateSubject } from "../services/subjectService";
import styles from "./FormTable.module.css";

function SubjectsPage() {
    const [subjects, setSubjects] = useState([]);
    const [form, setForm] = useState({ title: "", description: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        const res = await getSubjects();
        setSubjects(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                // ✅ Update subject
                await updateSubject(editId, form);
                setEditId(null);
                alert("Subject updated successfully ✅");
            } else {
                // ✅ Create new subject
                await createSubject(form);
                alert("Subject created successfully ✅");
            }

            setForm({ title: "", description: "" });
            fetchSubjects();
        } catch (error) {
            // ✅ Handle API errors from FastAPI
            if (error.response && error.response.data) {
                const apiError =
                    error.response.data.detail || JSON.stringify(error.response.data);
                alert(`Error: ${apiError}`);
            } else {
                alert("Unexpected error occurred. Please try again.");
            }
            console.error("Subject API error:", error);
        }
    };

    const handleDelete = async (id) => {
        await deleteSubject(id);
        fetchSubjects();
    };

    const handleUpdate = (subject) => {
        setForm({ title: subject.title, description: subject.description }); // ✅ correct keys
        setEditId(subject.id);
    };

    return (
        <div>
            <h1 className={styles.heading}>Subjects</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={`${styles.input} form-control`}
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <input
                    className={`form-control ${styles.input}`}
                    type="text"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                />
                <button className={styles.button} type="submit">
                    {editId ? "Update Subject" : "Add Subject"}
                </button>
            </form>

            <table className={styles.table}>
                <thead>
                    <tr className="text-center">
                        <th style={{ textAlign: "center" }} className={styles.th}>Title</th>
                        <th style={{ textAlign: "center" }} className={styles.th}>Description</th>
                        <th style={{ textAlign: "center" }} className={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center text-muted">
                                No subjects found.
                            </td>
                        </tr>
                    ) : (
                        subjects.map((s) => (
                            <tr key={s.id}>
                                <td className={styles.td}>{s.title}</td>
                                <td className={styles.td}>{s.description}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm updateBtn"
                                        onClick={() => handleUpdate(s)}  // ✅ pass subject object
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm deleteBtn"
                                        onClick={() => handleDelete(s.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SubjectsPage;

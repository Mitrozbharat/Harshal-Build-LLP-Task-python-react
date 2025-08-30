import { useEffect, useState } from "react";
import { createSubject, deleteSubject, getSubjects } from "../services/subjectService";

function SubjectsPage() {
    const [subjects, setSubjects] = useState([]);
    const [form, setForm] = useState({ title: "", description: "" });

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        const res = await getSubjects();
        setSubjects(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createSubject(form);
        setForm({ title: "", description: "" });
        fetchSubjects();
    };

    const handleDelete = async (id) => {
        await deleteSubject(id);
        fetchSubjects();
    };

    return (
        <div>
            <h1>Subjects</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <button type="submit">Add Subject</button>
            </form>

            <ul>
                {subjects.map((s) => (
                    <li key={s.id}>
                        {s.title} - {s.description}
                        <button onClick={() => handleDelete(s.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SubjectsPage;

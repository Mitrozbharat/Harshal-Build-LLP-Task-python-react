import { useEffect, useState } from "react";
import { createStudent, deleteStudent, getStudents } from "../services/studentService";

function StudentsPage() {

    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ name: "", email: "" });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const res = await getStudents();
        setStudents(res.data);
        console.log(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createStudent(form);
        setForm({ name: "", email: "" });
        fetchStudents();
    };

    const handleDelete = async (id) => {
        await deleteStudent(id);
        fetchStudents();
    };

    return (
        <div>
            <h1>Students</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <button type="submit">Add Student</button>
            </form>

            <ul>
                {students.map((s) => (
                    <li key={s.id}>
                        {s.name} ({s.email})
                        <button onClick={() => handleDelete(s.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentsPage;

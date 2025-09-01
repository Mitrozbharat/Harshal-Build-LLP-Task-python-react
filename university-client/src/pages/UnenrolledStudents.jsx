import { useEffect, useState } from "react";
import { getunenrolledStudets } from "../services/enrollmentService";
import styles from "./FromTable.module.css";

function StudentsPage() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const res = await getunenrolledStudets();
        setStudents(res.data);
    };



    return (
        <div style={{ textAlign: "center" }}>
            <h1 className={styles.heading}>UnEnrolled Students</h1>


            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }} className={styles.th}>ID</th>

                        <th style={{ textAlign: "center" }} className={styles.th}>Name</th>
                        <th style={{ textAlign: "center" }} className={styles.th}>Email</th>
                        {/* <th style={{ textAlign: "center" }} className={styles.th}>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {students.map((s) => (
                        <tr key={s.id} >
                            <td className={styles.td}> {s.id}</td>
                            <td className={styles.td}>{s.name}</td>
                            <td className={styles.td}>{s.email}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentsPage;

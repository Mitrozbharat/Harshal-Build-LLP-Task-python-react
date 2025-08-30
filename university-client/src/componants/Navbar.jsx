import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="p-4 bg-blue-600 text-white flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/students">Students</Link>
            <Link to="/subjects">Subjects</Link>
            <Link to="/enrollments">Enrollments</Link>
        </nav>
    );
}

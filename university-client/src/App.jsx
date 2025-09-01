import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import EnrollmentsPage from './pages/EnrollmentsPage';
import StudentsPage from './pages/studentPage';
import SubjectsPage from './pages/SubjectsPage';
import UnenrolledStudent from './pages/UnenrolledStudents';

function App() {

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/students">Students</Link> |{"   "}
          <Link to="/subjects">Subjects</Link> |{"   "}
          <Link to="/enrollments">Enrollments</Link>|{"   "}
          <Link to="/unenrolledStudents">UnEnrolledStudents</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/students" replace />} />

          <Route path="/students" element={<StudentsPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/enrollments" element={<EnrollmentsPage />} />
          <Route path="/unenrolledStudents" element={<UnenrolledStudent />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

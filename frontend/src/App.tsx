import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./pages/layout";
import Student from "./pages/student";
import Teacher from "./pages/teacher";
import TeacherCalendar from "./pages/teacherCalendar/TeacherCalendar";
function App() {

  return (
    <div className="w-screen h-screen">
      {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="student" element={<Student />} />
            <Route path="teacher" element={<Teacher />} />
            <Route path="/:id/calendar" element={<TeacherCalendar />} />
            </Route>
        </Routes>
    </div>
  )
}

export default App

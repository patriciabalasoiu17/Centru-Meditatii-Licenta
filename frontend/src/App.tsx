import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./pages/layout";
import Student from "./pages/student";
import Teacher from "./pages/teacher";
import TeacherCalendar from "./pages/teacherCalendar/TeacherCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Groups from "./pages/groups";
import Group from "./pages/groups/group";
import { Toaster } from "sonner";
import Users from "./pages/users";
import Catalog from "./pages/student/catalog";
function App() {

  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="student" element={<Student />} />
          <Route path="teacher" element={<Teacher />} />
          <Route path="group" element={<Groups />} />
          <Route path="group/:id/:name" element={<Group />} />
          <Route path="/calendar/:id" element={<TeacherCalendar />} />
          <Route path="/users" element={<Users />} />
          <Route path="/catalog/:studentId" element={<Catalog />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </div>
  )
}

export default App

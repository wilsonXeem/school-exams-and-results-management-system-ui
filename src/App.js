import "./App.css";

import Admin from "./pages/Admin";
import AdminDashboard from "./pages/Admin/Dashboard";
import Sessions from "./pages/Admin/Sessions";
import OtherSessions from "./pages/Admin/Sessions/OtherSessions";
import Level from "./pages/Admin/Level";
import ResultSessions from "./pages/Admin/ResultSessions"
import Result from "./pages/Admin/Results"
import Departments from "./pages/Admin/Departments";
import Department from "./pages/Admin/Departments/Department";
import Course from "./pages/Admin/Course";
import External from "./pages/Admin/External";
import OtherDepartments from "./pages/Admin/Departments/OtherDepartments";
import OtherResultSessions from "./pages/Admin/ResultSessions/OtherResultSessions";
import OtherExternals from "./pages/Admin/External/OtherExternals";
import OtherCourse from "./pages/Admin/Course/ExternalCourse";
import AdminStudentDashboard from "./pages/Admin/Student";
import AdminTranscript from "./pages/Admin/Transcript";
import SearchStudent from "./pages/Admin/SearchStudent";

import Student from "./pages/Student";
import PasswordReset from "./pages/Student/PasswordReset";
import DetailsUpdate from "./pages/Student/DetailsUpdate";
import StudentDashboard from "./pages/Student/Dashboard";
import Transcript from "./pages/Student/Transcript";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/admin/dashboard" exact element={<AdminDashboard />} />
          <Route path="/admin/course-reg/sessions" exact element={<Sessions />} />
          <Route path="/admin/course-reg/sessions/:sesion" exact element={<OtherSessions />} />
          <Route path="/admin/course-reg/:session/:level/:class_id/:semester" exact element={<Level />} />
          <Route path="/admin/results/sessions" exact element={<ResultSessions />} />
          <Route path="/admin/results/sessions/:sesion" exact element={<OtherResultSessions />} />
          <Route path="/admin/results/:session/:_id/:level/:semester" exact element={<Result />} />
          <Route path="/admin/faculty/courses" exact element={<Departments />} />
          <Route path="/admin/faculty/courses/:sesion" exact element={<OtherDepartments />} />
          <Route path="/admin/faculty/:session/courses/:code" exact element={<Department />} />
          <Route path="/admin/faculty/:session/:level/:semester/:code" exact element={<Course />} />
          <Route path="/admin/faculty/:session/:semester/:code/:title/:unit" exact element={<OtherCourse />} />
          <Route path="/admin/faculty/external" exact element={<External />} />
          <Route path="/admin/faculty/external/:sesion" exact element={<OtherExternals />} />
          <Route path="/admin/student/:_id" exact element={<AdminStudentDashboard />} />
          <Route path="/admin/student/transcript/:sesion/:level/:_id" exact element={<AdminTranscript/>}/>
          <Route path="/admin/search/student" exact element={<SearchStudent/>}/>
          
          <Route path="/student" exact element={<Student/>}/>
          <Route path="/student/password/reset" exact element={<PasswordReset/>}/>
          <Route path="/student/details/:_id" exact element={<DetailsUpdate/>}/>
          <Route path="/student/dashboard/:_id" exact element={<StudentDashboard/>}/>
          <Route path="/student/transcript/:sesion/:_id" exact element={<Transcript/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

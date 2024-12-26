import React, { useState, useEffect, useContext, useRef } from "react";
import "./adminstudentdashboard.css";
import unn from "../../../data/unn.png";
import Table from "./ocmponents/Table";
import GPtable from "./ocmponents/GPtable";
import { useParams } from "react-router-dom";
import { ValueContext } from "../../../Context";
import generatePDF from "react-to-pdf";

function AdminStudentDashboard() {
  const target = useRef();
  const { _id } = useParams();
  const { socket } = useContext(ValueContext);
  const [session, setSession] = useState({});
  const [student, setStudent] = useState({});
  const [courses, setCourses] = useState([]);
  const [total_semesters, setTotal_semesters] = useState([]);

  useEffect(() => {
    socket.emit("student", { _id });
  }, []);

  socket.on("student", (res) => {
    setStudent(res.student);
    setTotal_semesters(res.student.total_semesters);
    setSession(
      res.student.total_semesters[res.student.total_semesters.length - 1]
    );
    setCourses(
      res.student.total_semesters[res.student.total_semesters.length - 1]
        .courses
    );
  });

  return (
    <div class="student_dashboard" ref={target}>
      <div class="student_dashboard_head">
        <div class="passport">
          <div class="passport_img">
            <img src={unn} alt="" />
          </div>
        </div>
        <div class="dashboard_header">
          {/* <div class="student_dashboard_header_img">
            <img src={unn} alt="" />
          </div> */}
          <div class="student_dashboard_head_title">
            <h2>Faculty of Pharmaceutical Sciences</h2>
            <p style={{ fontWeight: "bold", fontSize: "larger" }}>
              University of Nigeria Nsukka
            </p>
            <h2>Student's Result</h2>
            <i>(Student's Copy)</i>
          </div>
        </div>
        <div class="passport">
          <div class="passport_img">
            <img src={student.profile_image} alt="" />
          </div>
        </div>
      </div>
      <div class="student_dashboard_body">
        {/* <div className="student_dashboard_body_title">
          <h2 style={{ textTransform: "uppercase" }}>{student.fullname}</h2>
        </div> */}
        <div class="student_dashboard_body_details">
          <p>
            Name: <b>{student.fullname}</b>
          </p>
          <p>
            Reg. No: <b>{student.reg_no}</b>
          </p>
          <p>
            Programme: <b>Pharm. D</b>
          </p>
          <p>
            Session:{" "}
            <b>
              <select
                onChange={(e) => {
                  if (total_semesters[e.target.value])
                    setSession(total_semesters[e.target.value]);
                  setCourses(total_semesters[e.target.value].courses);
                }}
              >
                <option>{session.session}</option>
                {total_semesters.map((semester, i) => (
                  <option value={i}>
                    {semester.session}- {semester.semester}
                  </option>
                ))}
              </select>
            </b>
          </p>
          <p>
            Level: <b>{session.level}</b>
          </p>
          <p>
            Semester: <b>{session.semester === 1 ? "first" : "second"}</b>
          </p>
        </div>
        {courses.length > 0 && <Table courses={courses} />}
        <GPtable
          session={session}
          cgpa={student.cgpa}
          id={student._id}
          generatePDF={generatePDF}
          target={target}
        />
      </div>
    </div>
  );
}

export default AdminStudentDashboard;

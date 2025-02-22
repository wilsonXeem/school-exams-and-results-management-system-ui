import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import levels from "../../../data/levels";
import units from "../../../data/units";
// import "./level.css";
import Table from "./components/Table";
import useExcelParser from "./components/useExcelParser";
import { ValueContext } from "../../../Context";
import Loader from "../../../components/Loader";

function Level() {
  const { level, semester, class_id, session } = useParams();
  const current_semester = levels[level][semester];
  const course_code = Object.keys(current_semester);
  const course_title = Object.values(current_semester);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const { data, parseExcel } = useExcelParser();
  const { socket, setAlert } = useContext(ValueContext);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);

  const [reg_no, setReg_no] = useState("");
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [unit_load, setUnit_load] = useState(0);

  useEffect(() => {
    socket.emit("class", { class_id, semester });
  }, []);

  socket.on("class", (res) => {
    setStudents(res.current_semester);
    // setAlert(true, res.message, "success");
    setLoad(false);
    setShow(false);
  });

  socket.on("registered", (res) => window.location.reload());

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      parseExcel(file);
    }
  };

  const handle_course_reg = () => {
    setLoad(true);
    const students = data.map((student) => Object.keys(student)[0]);
    data.map((student, i) => {
      fetch("http://127.0.0.1:8000/api/class/course/register", {
        method: "POST",
        body: JSON.stringify({
          fullname: student[students[i]],
          reg_no: students[i],
          level,
          course_title: current_semester[selectedCourse],
          course_code: selectedCourse,
          unit_load: units[selectedCourse],
          semester,
          session,
          class_id,
          external: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setStudents(json.current_semester);
          setLoad(false);
        })
        .catch((err) => console.log(err));
    });
    setAlert(true, "course registered successfully!", "success");
  };

  const handle_external_course = () => {
    fetch("http://127.0.0.1:8000/api/class/course/register", {
      method: "POST",
      body: JSON.stringify({
        reg_no,
        level,
        course_title: title,
        course_code: code,
        unit_load,
        semester,
        session,
        class_id,
        external: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div class="current_level">
      <div class="header">
        <h2>
          {level} Level:{" "}
          {semester === "1" ? "first semester" : "second semester"}
        </h2>
      </div>
      <div class="course_reg_upload">
        <p>Register course:</p>
        <select
          name="course"
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option>Select course</option>
          {course_code.map((course, key) => (
            <option value={course}>
              <span>{course}</span> {course_title[key]}
            </option>
          ))}
        </select>
        <p style={{ textAlign: "center" }}>
          Unit load: <b>{units[selectedCourse]}</b>
        </p>
        {/* <input type="number" placeholder="Unit load"/> */}
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <button
          onClick={() => {
            handle_course_reg();
            setLoad(true);
          }}
        >
          Upload
        </button>
        <button onClick={() => setShow(true)}>Add external course</button>
      </div>
      {show && (
        <div class="external_course_reg_upload">
          <p>Register external course:</p>
          <input
            type="text"
            placeholder="Reg. No"
            value={reg_no}
            onChange={(e) => setReg_no(e.target.value)}
          />
          <input
            type="text"
            placeholder="Course code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Unit load"
            value={unit_load}
            onChange={(e) => setUnit_load(e.target.value)}
          />
          <button
            onClick={() => {
              handle_external_course();
              setLoad(true);
            }}
          >
            Register
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </div>
      )}
      {load && <Loader />}
      {students.length > 0 && <Table students={students} />}
    </div>
  );
}

export default Level;

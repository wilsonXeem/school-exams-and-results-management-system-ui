import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Table({ students, session, semester, code }) {
  const navigate = useNavigate();
  students.sort(function (a, b) {
    if (a.fullname < b.fullname) {
      return -1;
    }
    if (a.fulname > b.fullname) {
      return 1;
    }
    return 0;
  });
  const semesters = students.map((student) =>
    student.total_semesters.find(
      (sem) => sem.session === session && sem.semester === Number(semester)
    )
  );

  const courses = semesters.map((sem) =>
    sem.courses.find((course) => course.course_code === code)
  );

  // console.log(courses);

  return (
    <div className="course_table">
      <table>
        <tr>
          <th className="center">s/n</th>
          <th>reg. no</th>
          <th>names</th>
          <th className="center">ca</th>
          <th className="center">exam</th>
          <th className="center">total</th>
          <th className="center">grade</th>
        </tr>
        {students.length > 0 &&
          students.map((student, i) => (
            <tr key={i}>
              <td className="center">{i + 1}</td>
              <td onClick={() => navigate(`/admin/student/${student._id}`)}>
                {student.reg_no}
              </td>
              <td onClick={() => navigate(`/admin/student/${student._id}`)}>
                {student.fullname}
              </td>
              <td className="center">{courses[i].ca.toFixed(2)}</td>
              <td className="center">{courses[i].exam.toFixed(2)}</td>
              <td className="center">{courses[i].total.toFixed(2)}</td>
              <td className="center">
                {courses[i].grade === 5 && <b>A</b>}
                {courses[i].grade === 4 && <b>B</b>}
                {courses[i].grade === 3 && <b>C</b>}
                {courses[i].grade === 2 && <b>D</b>}
                {courses[i].grade === 1 && <b>E</b>}
                {courses[i].grade === 0 && <b style={{ color: "red" }}>F</b>}
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}

export default Table;

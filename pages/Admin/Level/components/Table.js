import React from "react";
import levels from "../../../../data/levels";
import { useParams, useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function Table({ students }) {
  students.sort(function (a, b) {
    if (a.fullname < b.fullname) {
      return -1;
    }
    if (a.fullname > b.fullname) {
      return 1;
    }
    return 0;
  });
  const { level, semester, session } = useParams();
  const navigate = useNavigate();
  const current_semester = levels[level][semester];
  const course_codes = Object.keys(current_semester);
  const current_semesters = students.map((student) => {
    const courses = student.total_semesters.find(
      (current) =>
        current.session === session && current.semester === Number(semester)
    );
    return courses.courses;
  });

  const externals = students.map((student) => {
    const courses = student.total_semesters.find(
      (current) =>
        current.level === Number(level) && current.semester === Number(semester)
    );
    return courses;
    // const course = courses.find((course) => course.external_course === true);
    // if (course) return student;
  });

  const external = externals.map((semester) => {
    if (semester) {
      return semester.courses.filter((cours) => cours.external === true);
    }
  });

  return (
    <div class="table trans">
      <table>
        <tr>
          <th className="center">s/n</th>
          <th>reg.no</th>
          <th>names</th>
          {course_codes.map((course_code) => (
            <th className="center">{course_code}</th>
          ))}
        </tr>
        {students.length > 0 &&
          students.map(
            (student, i) =>
              student && (
                <tr>
                  <td className="center">{i + 1}</td>
                  <td onClick={() => navigate(`/admin/student/${student._id}`)}>
                    {student.reg_no}
                  </td>
                  <td onClick={() => navigate(`/admin/student/${student._id}`)}>
                    {student.fullname}
                  </td>
                  {course_codes.map((course_code) => {
                    const course = current_semesters[i].find(
                      (single_course) =>
                        single_course.course_code === course_code
                    );
                    if (course) {
                      return (
                        <td className="center">
                          <CheckIcon color="success" />
                        </td>
                      );
                    } else {
                      return (
                        <td className="center">
                          <CloseIcon color="error" />
                        </td>
                      );
                    }
                  })}
                </tr>
              )
          )}
      </table>
      <div>
        <p>Extra curricular courses</p>
      </div>
      <table>
        <tr>
          {/* <th className="center">s/n</th> */}
          <th>names</th>
          <th>reg. no.</th>
          <th>course</th>
          <th className="center">unit</th>
        </tr>
        {external.length > 0 &&
          external.map(
            (course, i) =>
              course &&
              course.map((cours) => (
                <tr>
                  {/* <td className="center">{i + 1}</td> */}
                  <td>{students[i].fullname}</td>
                  <td>{students[i].reg_no}</td>
                  <td>
                    {cours.course_code} {cours.course_title}
                  </td>
                  <td className="center">{cours.unit_load}</td>
                </tr>
              ))
          )}
      </table>
    </div>
  );
}

export default Table;

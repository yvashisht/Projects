import Course from "./Course";

const CourseList = ({ courses }) => (
    <div>
        {Object.entries(courses).map(([id, course]) => <Course key={id} course={course} />)}
    </div>
);

export default CourseList;

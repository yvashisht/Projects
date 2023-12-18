const CourseList = ({ courses }) => {
    return (
        <div>
            {Object.entries(courses).map(([id, course]) => (
                <p key={id}>{course.term} CS {course.number} : {course.title}</p>
            ))}
        </div>
    );
}

export default CourseList;

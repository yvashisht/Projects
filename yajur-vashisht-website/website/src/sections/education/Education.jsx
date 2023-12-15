import './education.css';

const Education = () => {
    return (
        <section id="education">
            <h2>Education</h2>

            <div className="education-entry">
                <h3>University of Calgary</h3>
                <h4>M.Eng, Software Engineering</h4>
                <p className="education-department">Department of Electrical and Computer Engineering</p>
                <p className="education-dates">May 2023 - April 2024</p>
                <p>In the ever-evolving landscape of software engineering, I've honed my skills in agile development, mastering the art of crafting scalable code and robust architectures. My journey has been marked by a deep dive into algorithms, data structures, and the mastery of full-stack development, from sleek front-end interfaces to efficient back-end systems.</p>
            </div>

            <div className="education-entry">
                <h3>University of Alberta</h3>
                <h4>BSc, Chemical Engineering, Certificate in Sustainability</h4>
                <p className="education-department">Department of Chemical Engineering</p>
                <p className="education-dates">September 2017 - April 2023</p>
                <p>Chemical engineering has taught me the alchemy of transforming raw materials into innovations. It's been a blend of rigorous process optimization, thermodynamics, and safety principles, all while keeping sustainability at the core. I've learned to navigate the complex chemical processes and equipment design that are the backbone of this industrious field.</p>
            </div>
        </section>
    );
};

export default Education;

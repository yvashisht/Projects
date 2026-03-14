import './education.css';

const Education = () => {
    return (
        <section id="education">
            <h2>Education</h2>

            <div className="education-entry">
    <h3>University of Wisconsin-Madison</h3>
    <h4>Certificate, Engine Systems</h4>
    <p className="education-department">Department of Continuing Education</p>
    <p className="education-dates">Jun 2025 - Dec 2025</p>
    <p>This certificate deepened my understanding of engine operation, combustion, thermodynamics, and performance. It strengthened my technical knowledge of powertrain systems and supported my growing interest in high performance and motorsport engineering.</p>
</div>

<div className="education-entry">
    <h3>University of Calgary</h3>
    <h4>M.Eng, Software Engineering</h4>
    <p className="education-department">Department of Electrical and Computer Engineering</p>
    <p className="education-dates">May 2023 - Apr 2024</p>
    <p>This degree developed my skills in software design, data analysis, and problem solving. It gave me a strong foundation in building practical, reliable systems and helped me apply software thinking to real world engineering challenges.</p>
</div>

<div className="education-entry">
    <h3>University of Alberta</h3>
    <h4>BSc, Chemical Engineering, Certificate in Sustainability</h4>
    <p className="education-department">Department of Chemical Engineering</p>
    <p className="education-dates">Sept 2017 - Apr 2023</p>
    <p>This degree gave me a strong foundation in process engineering, thermodynamics, and system optimization. My sustainability certificate added a broader perspective on designing solutions that balance performance, safety, and environmental responsibility.</p>
</div>
        </section>
    );
};

export default Education;

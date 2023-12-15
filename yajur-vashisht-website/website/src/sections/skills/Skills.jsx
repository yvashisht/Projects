import './skills.css';

const Skills = () => {
    const skills = {
        languages: ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C++', 'MATLAB'],
        frameworks: ['React', 'Node.js', 'Express', 'Django', 'Firebase'],
        tools: ['Git', 'Docker'],
        databases: ['MySQL', 'MongoDB', 'PostgreSQL'],
        bigData: ['Hadoop', 'PySpark'],
        digitalEditing: ['Adobe Photoshop', 'Adobe Lightroom', 'Sony Vegas Pro 13']
    };

    return (
        <section id="skills">
            <h2>Skills</h2>
            <div className="skills-container">
                {Object.entries(skills).map(([category, skillsList]) => (
                    <div key={category} className="skill-category">
                        <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        <ul>
                            {skillsList.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;

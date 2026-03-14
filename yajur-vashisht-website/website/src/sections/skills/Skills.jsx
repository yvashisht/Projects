import './skills.css';

const Skills = () => {
    const skills = {
        programming: ['Python', 'Java', 'C++', 'MATLAB', 'JavaScript'],
        web: ['React', 'Node.js', 'Express', 'HTML', 'CSS'],
        data: ['PySpark', 'Hadoop'],
        tools: ['Git', 'Docker', 'Firebase'],
        databases: ['MySQL', 'PostgreSQL', 'MongoDB'],
        controls: ['Foxboro I/A', 'Honeywell Experion'],
        safety: ['Industrial Fire Fighting', 'First Aid']
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
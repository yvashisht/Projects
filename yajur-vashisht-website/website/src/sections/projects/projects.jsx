import './projects.css'

const projects = () => {
    const projects = [
        {
            title: 'This Website!',
            description: 'Developed a personal website from scratch using React, Javascript, and CSS.',
            githubUrl: 'https://github.com/yvashisht/Projects.git'
        },
        {
            title: 'ENSF 614 - C++ and Software Design Patterns Assignments',
            description: 'Created applications using C++ and applied various software design patterns to solve design problems.',
            class: 'Advanced System Analysis and Software Design',
            githubUrl: 'https://github.com/yourusername/java-class-assignments'
        },
        {
            title: 'ENSF 614 Final Project - Flight Reservation Website',
            description: 'Created applications using C++ and applied various software design patterns to solve design problems.',
            class: 'Advanced System Analysis and Software Design',
            githubUrl: 'https://github.com/yourusername/java-class-assignments'
        },
        {
            title: 'ENSF 611 - Machine Learning Assignments',
            description: 'Built and trained machine learning models using scikit-learn for predictive analysis.',
            class: 'Machine Learning for Software Engineers',
            githubUrl: 'https://github.com/yvashisht/ENSF611.git'
        },
        {
            title: 'ENSF 593 - Java Assignments',
            description: 'Developed several Java applications focusing on OOP principles and data structures.',
            class: 'Principles of Software Development I',
            githubUrl: 'https://github.com/yourusername/java-class-assignments'
        },
        {
            title: 'ENSF 592 - Python Assignments',
            description: 'Implemented various Python scripts and applications, including data analysis with pandas and NumPy.',
            class: 'Programming Fundamentals for Data Engineers',
            githubUrl: 'https://github.com/yourusername/java-class-assignments'
        },
        {
            title: 'ENSF 592 Python - Final Project',
            description: 'Implemented various Python scripts and applications, including data analysis with pandas and NumPy.',
            class: 'Programming Fundamentals for Data Engineers',
            githubUrl: 'https://github.com/yourusername/java-class-assignments'
        },
        {
            title: 'ENSF 608 - Databases Assignments',
            description: 'Designed and managed SQL databases, optimizing queries and designing schemas for efficiency.',
            class: 'Database Systems',
            githubUrl: 'https://github.com/yourusername/java-class-assignments'
        },
        {
            title: 'ENSF 608 Databases - Final Project',
            description: 'Designed and managed SQL databases, optimizing queries and designing schemas for efficiency.',
            class: 'Database Systems',
            githubUrl: 'https://github.com/yvashisht/ensf608-project.git'
        },
        {
            title: 'ENSF 612 Big Data - Final Project',
            description: 'Conducted big data processing and analytics using the Hadoop ecosystem and PySpark framework.',
            class: 'Big Data',
            githubUrl: 'https://github.com/yourusername/java-class-assignments'
        },
        {
            title: 'ENSF 607 - Software Design & Architecture Assignments',
            description: 'A study of software design topics including: abstraction, modularity, design patterns, software modelling, architectural patterns.',
            class: 'Software Design & Architecture I',
            githubUrl: 'https://github.com/yvashisht/ENSF607.git'
        },
        {
            title: 'CHE 465 - Chemical Engineering Design II',
            description: 'Collaborated on a comprehensive capstone project with an industry partner, addressing the reduction of carbon emissions from an operating fuel gas system through supplementing combustion with hydrogen.',
            class: 'Chemical Engineering Design',
        },
    ];

    return (
        <section id="previouswork">
            <h2>Previous Work</h2>
            <div className="previous-work-container">
                {projects.map((project, index) => (
                    <div key={index} className="project-item">
                        <h3>{project.title}</h3>
                        <div className="project-detail">{project.class}</div>
                        <ul className="project-description">
                            <li>{project.description}</li>
                        </ul>
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                View on GitHub
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default projects
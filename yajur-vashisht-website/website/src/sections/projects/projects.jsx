import './projects.css'

const projects = () => {
    const projects = [
        {
            title: 'This Website!',
            description: 'Developed a personal website from scratch using React, Javascript, and CSS.',
            githubUrl: 'https://github.com/yvashisht/Projects.git'
        },
        {
            title: 'A* Path Finding Algorithim',
            description: 'Engineered an A* algorithm visualizer, optimizing pathfinding. Translated computational theory into practical application, crafting an interactive tool to navigate graph complexities.',
            githubUrl: 'https://github.com/yvashisht/Projects.git'
        },
        {
            title: 'Movie Store',
            description: 'Developed a movie store using React, CSS, Node, Express, Javascript, and MySQL for the backend. This project demonstrates CRUD fundamentals and displays the connectivity between frontend and backend.',
            githubUrl: 'https://github.com/yvashisht/Projects.git'
        },
        {
            title: 'Class Scheduling App',
            description: 'Developed a class scheduling app using React and Firebase.',
            githubUrl: 'https://github.com/yvashisht/Projects.git'
        },
        {
            title: 'Python Pong AI Project',
            description: 'AI teaching itself how to play Pong through the use of NEAT (Neuro Evolution of Augmented Topologies).',
            githubUrl: 'https://github.com/yvashisht/Projects.git'
        },
        {
            title: 'ENSF 614 Final Project - Flight Reservation Website',
            description: 'Created a flight reservation website using React, CSS, Node, Express, Javascript, and Django. This project also incorporates design patterns and documentation.',
            class: 'Advanced System Analysis and Software Design',
            githubUrl: 'https://github.com/yvashisht/Projects.git'
        },
        {
            title: 'ENSF 608 Databases - Final Project',
            description: 'Designed an SQL database with an EER model, Relational model, and displayed query demonstrations.',
            class: 'Database Systems',
            githubUrl: 'https://github.com/yvashisht/ensf608-project.git'
        },
        {
            title: 'ENSF 612 Big Data - Final Project',
            description: 'Conducted big data processing and machine learning on a reddit climate change dataset using the PySpark framework.',
            class: 'Big Data',
            githubUrl: 'https://github.com/yvashisht/Projects.git'
        },
        {
            title: 'ENSF 592 Python - Final Project',
            description: 'Implemented various Python pandas and NumPy operations on a Formula One dataset pertaining to statistics from the last three seasons (2020-2023).',
            class: 'Programming Fundamentals for Data Engineers',
            githubUrl: 'https://github.com/yvashisht/Projects.git'
        },
        {
            title: 'ENSF 614 - C++ and Software Design Patterns Assignments',
            description: 'Created applications using C++ and applied various software design patterns to solve design problems.',
            class: 'Advanced System Analysis and Software Design',
            githubUrl: 'https://github.com/yvashisht/ENSF614.git'
        },
        {
            title: 'ENSF 611 - Machine Learning Assignments',
            description: 'Built and trained machine learning models using scikit-learn for predictive analysis.',
            class: 'Machine Learning for Software Engineers',
            githubUrl: 'https://github.com/yvashisht/ENSF611.git'
        },
        {
            title: 'ENSF 608 - Databases Assignments',
            description: 'Designed and managed SQL databases, optimizing queries and designing schemas for efficiency.',
            class: 'Database Systems',
            githubUrl: 'https://github.com/yvashisht/ensf608-assignments.git'
        },
        {
            title: 'ENSF 593 - Java Assignments',
            description: 'Developed several Java applications focusing on OOP principles and data structures.',
            class: 'Principles of Software Development I',
            githubUrl: 'https://github.com/yvashisht/ensf593-assignments.git'
        },
        {
            title: 'ENSF 592 - Python Assignments',
            description: 'Implemented various Python scripts and applications, including data analysis with pandas and NumPy.',
            class: 'Programming Fundamentals for Data Engineers',
            githubUrl: 'https://github.com/yvashisht/ensf592-assignments.git'
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
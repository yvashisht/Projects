import './workExperience.css';

const WorkExperience = () => {
    const experiences = [
        {
            role: "Project Coordinator Co-op",
            company: "City of Edmonton, Renewable Energy Systems",
            location: "Edmonton, AB",
            period: "April – Dec 2022",
            tasks: [
                "Assisted the Renewable Energy Section Manager in utility design and approval processes.",
                "Engaged in design coordination, process reviews, and flowchart developments.",
                "Monitored engineering activities to control project scope, schedule, quality, and budget.",
            ],
        },
        {
            role: "Maintenace Engineer Co-op",
            company: "PepsiCo",
            location: "Calgary, AB",
            period: "Jan – Aug 2021",
            tasks: [
                "Continuous improvement projects to reduce downtime and increase running efficiency.",
                "Planned and undertook scheduled maintenance, responding to breakdowns, diagnosing faults, and assisting in repairing equipment.",
                "Maintaining statistical and financial records, ensuring compliance with health and safety legislation, creating maintenance procedures and PMs, and managing stocks of supplies and equipment.",
            ],
        },
        {
            role: "Environmental Engineer Co-op",
            company: "DST Consulting",
            location: "Edmonton, AB",
            period: "May – Aug 2020",
            tasks: [
                "Performed hazardous materials surveys (asbestos, mold, lead, etc), abatement and remediation inspections, as well as air sampling.",
                "Prepared written reports from analysis of lab report data.",
                "Coordinated and maintained field equipment maintenance.",
            ],
        },
        {
            role: "Materials Engineer Co-op",
            company: "Englobe Corp",
            location: "Edmonton, AB",
            period: "Jan – May 2020",
            tasks: [
                "Preparation of quality control lab reports to ensure adherence to site specifications including surveying, lab testing, aggregate testing, as well as concrete, asphalt, and field density programs.",
                "Successfully developed relationships with clients, industry affiliates, engineers, technologists, technicians, and construction personnel.",
                "Managed multiple job sites and projects.",
            ],
        },
    ];

    return (
        <section id="workexperience">
            <h2>Work Experience</h2>
            <div className="experience-container">
                {experiences.map((exp, index) => (
                    <div key={index} className="experience-item">
                        <h3>{exp.role} - <span>{exp.company}</span></h3>
                        <p className="experience-location">{exp.location}</p>
                        <p className="experience-period">{exp.period}</p>
                        <ul className="experience-tasks">
                            {exp.tasks.map((task, taskIndex) => (
                                <li key={taskIndex}>{task}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkExperience;

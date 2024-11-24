import './workExperience.css';

const WorkExperience = () => {
    const experiences = [
        {
            role: "Advanced Process Control Engineer",
            company: "Shell PLC",
            location: "Sarnia, ON",
            period: "July 2024 - Current",
            tasks: [
                "Optimized process control systems using Honeywell and Foxboro technologies, enhancing efficiency and reliability through SCADA integration and real-time data analysis.",
                "Managed and updated servers and control systems, ensuring seamless operations and high security by applying systems engineering principles and cybersecurity best practices.",
                "Collaborated on process automation projects, utilizing PID control and advanced analytics to troubleshoot issues, improve performance, and support continuous improvement initiatives.",
            ],
        },
        {
            role: "Software Engineering Capstone Project",
            company: "Tesla, Dojo Testing",
            location: "Palo Alto (Remote)",
            period: "Jan - May 2024",
            tasks: [
                "Spearheaded the development of a web-based database management tool for Tesla's Dojo Testing team, focusing on enhancing efficiency within internal pipelines",
                "Employed advanced web development skills using TypeScript, Next.js, MongoDB, and Next-Auth to build a flexible, user-friendly interface for efficient data management and viewing that incorporates OAuth via Azure.",
                "Initiated a comprehensive project to innovate Tesla’s data handling capabilities, incorporating unit and integration testing frameworks, aimed at surpassing a target of 80% test coverage.",
            ],
        },
        {
            role: "Project Coordinator Co-op",
            company: "City of Edmonton, Renewable Energy Systems",
            location: "Edmonton, AB",
            period: "April – Dec 2022",
            tasks: [
                "Assisted in the utility design and development of an approval process, resulting in utility customer growth of 15%.",
                "Fielded design coordination, reviews, and development of process flow charts.",
                "Monitored engineering activities and worked with project teams to control scope, schedule, quality, and budget.",
            ],
        },
        {
            role: "Maintenace Engineer Co-op",
            company: "PepsiCo",
            location: "Calgary, AB",
            period: "Jan – Aug 2021",
            tasks: [
                "Undertook continuous improvement projects to reduce downtime by 2 hrs/week and increase efficiency by 0.6%.",
                "Revamped and coded a SharePoint system for breakdown tracking, integrating kaizen principles to boost maintenance efficiency and predictability.",
                "Maintained statistical and financial records, ensuring compliance with health and safety legislation, creating maintenance procedures and PMs, and managing stocks of supplies and equipment.",
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

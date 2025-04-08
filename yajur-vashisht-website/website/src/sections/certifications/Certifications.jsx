import './certifications.css';

const Certifications = () => {
    const certifications = [
        { title: 'Sustainability Certificate', issuer: 'University of Alberta', year: '2022' },
        { title: 'Google Data Analytics', issuer: 'Coursera', year: '2023' },
        { title: 'Web Development Bootcamp', issuer: 'Udemy', year: '2023' },
        { title: 'C++, Beginner to Beyond', issuer: 'Udemy', year: '2023' },
        { title: 'Performance Engineering in F1', issuer: 'MotorsportEngineer', year: '2023' },
        { title: 'Aero Design', issuer: 'MotorsportEngineer', year: '2023' },
        { title: 'PLC Software and Hardware Automation', issuer: 'Udemy', year: '2024' },
        { title: 'Product Design', issuer: 'Udacity', year: '2024' },
        { title: 'PMP', issuer: 'PMI', year: '2025' },
    ];

    return (
        <section id="certifications">
            <h2>Certifications</h2>
            <div className="certifications-container">
                {certifications.map((cert, index) => (
                    <div key={index} className="certification-item">
                        <h3>{cert.title}</h3>
                        <p>{cert.issuer}</p>
                        <p>{cert.year}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certifications;

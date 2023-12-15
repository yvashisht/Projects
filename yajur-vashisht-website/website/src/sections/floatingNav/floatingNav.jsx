import './floatingNav.css';

const FloatingNav = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="floating-nav">
            <p>© {currentYear} Yajur Vashisht. All rights reserved.</p>
            <div className="floating-nav-links">
                <a href="mailto:yajur.vashisht@ucalgary.ca">Email Me</a>
                <a href="https://linkedin.com/in/yajur-vashisht" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
        </div>
    );
};

export default FloatingNav;

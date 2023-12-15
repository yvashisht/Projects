import NavBar from './sections/navBar/NavBar';
import About from './sections/about/About';
import Education from './sections/education/Education';
import Skills from './sections/skills/Skills'
import Certifications from './sections/certifications/Certifications';
import Contact from './sections/contact/Contact';
import WorkExperience from './sections/workExperience/workExperience';
import Projects from './sections/projects/projects';
import Header from './sections/header/Header';
import FloatingNav from './sections/floatingNav/floatingNav';
import './index.css';

const App = () => {

    return (
        <div className={App}>
            <NavBar />
            <Header />
            <About />
            <Education />
            <Skills />
            <Certifications />
            <WorkExperience />
            <Projects />
            <Contact />
            <FloatingNav />
        </div>
    );
}

export default App;

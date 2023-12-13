import NavBar from './sections/navBar/navBar';
import About from './sections/about/About';
import Education from './sections/education/Education';
import Certifications from './sections/certifications/Certifications';
import Contact from './sections/contact/Contact';
import WorkExperience from './sections/workExperience/workExperience';
import Projects from './sections/projects/projects';
import Footer from './sections/footer/Footer';
import Header from './sections/header/Header';
import FloatingNav from './sections/floatingNav/floatingNav';

const App = () => {
    return (
        <main>
            <NavBar />
            <Header />
            <About />
            <Contact />
            <Education />
            <Certifications />
            <WorkExperience />
            <Projects />
            <Footer />
            <FloatingNav />
        </main>
    )
}

export default App;

import AboutImage from '../../assets/About.jpg'
import CV from '../../assets/Yajur Vashisht.pdf'
import { HiDownload } from 'react-icons/hi'
import Card from '../../components/Card'
import data from './data'
import './about.css'

const About = () => {
    return (
        <section id="about">
            <div className="container about__container">
                <div className="about__left">
                    <div className="about__portrait">
                        <img src={AboutImage} alt="About Image" />
                    </div>
                </div>
                <div className="about__right">
                    <h2>
                        About Me
                    </h2>
                    <div className="about__cards">
                        {
                            data.map(item => (
                                <Card key={item.id} className="about__card">
                                    <span className='about__card-icon'>{item.icon}</span>
                                    <h5>{item.title}</h5>
                                    <small>{item.desc}</small>
                                </Card>
                            ))
                        }
                    </div>
                    <p>
                        I'm Yajur Vashisht, a Master's graduate in Electrical and Computer Engineering from the University of Calgary, with a background in Chemical Engineering from the University of Alberta, emphasizing sustainability.
                        My expertise spans web development, Python programming, and a range of professional certifications that reflect my commitment to continuous growth and technical excellence.
                        Beyond coding and problem-solving, I'm driven by a passion for motorsport, diving into the intricacies of aerodynamics. My love for photography and travel fuels my curiosity and inspires me to explore the world.
                    </p>
                    <p>
                        In my professional quest, I'm seeking a software engineering role that challenges my blend of programming prowess and engineering insight.
                        I'm keen to join a team where innovation and sustainability are at the forefront, applying my skills in coding, data analytics, and system optimization.
                        Ready to contribute to user-centric designs and advanced technological solutions, I'm eager to connect with a team that values imaginative and solid problem-solving skills to navigate the future of technology.
                    </p>
                    <a href={CV} download className='btn primary'>Download Resume <HiDownload /></a>
                </div>
            </div>
        </section>
    )
}

export default About
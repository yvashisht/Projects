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
                        I'm Yajur Vashisht, an engineer aiming to build a career in motorsport fuels. My background combines chemical engineering, software engineering, and engine systems, giving me a mix of chemistry, thermodynamics, data analysis, and technical problem solving. 
                    </p>
                    <p>
                        I'm particularly drawn to the role fuels play in engine performance, compliance, reliability, and race operations. What interests me most is the opportunity to work at the intersection of fuel chemistry, testing, regulations, and trackside performance support. I want to be part of a team where precision, preparation, and technical understanding directly contribute to performance on track.
                    </p>
                    <a href={CV} download className='btn primary'>Download Resume <HiDownload /></a>
                </div>
            </div>
        </section>
    )
}

export default About
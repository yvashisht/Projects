import HeaderImage from '../../assets/picture.jpeg'
import data from './data';
import './header.css'

const Header = () => {
    return (
        <section id="header">
            <div className="container header__container">
                <div className="header__profile">
                    <img src={HeaderImage} alt="Header Logo" />
                </div>
                <h3>Yajur Vashisht</h3>
                <p>
                    I'm Yajur Vashisht, an engineer with a background in chemical engineering, software engineering, and engine systems. At Shell, I currently support downstream fuels blending and work with SCADA systems, NIR modelling, and PID control. My true passion lies in motorsport fuels, where I want to contribute to the research and development of sustainable fuels for high performance environments.
                </p>
                <div className="header__cta">
                    <a href="#contact" className='btn primary'>Let's Talk</a>
                    <a href="#previouswork" className='btn light'>My Work</a>
                </div>
                <div className="header__socials">
                    {
                        data.map(item => <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer"> {item.icon}</a>)
                    }
                </div>
            </div>
        </section >
    )
}

export default Header
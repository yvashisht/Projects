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
                    Energized by the fast-paced world of Electrical and Computer Engineering, I’m Yajur Vashisht, an avid tech enthusiast with a sustainable twist and a passion for the adrenaline of motorsport. When not immersed in tech, I'm capturing life through a lens or plotting my next adventurous escape.
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
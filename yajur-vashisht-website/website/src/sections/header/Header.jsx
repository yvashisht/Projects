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
                    Hey there! I'm Yajur Vashisht, currently diving deep into the world of Electrical and Computer Engineering at the University of Calgary. My background? A splash of Chemical Engineering from the University of Alberta with a twist of sustainability.
                    In my toolkit, I've got a bunch of tech skills from HTML to Python, and some shiny certifications to back it up. But it's not all work and no play—I get my kicks from the rush of motorsport and have a knack for turning complex designs from ideas into reality.
                    When I'm not working on engineering stuff, you might find me out with my camera, trekking to the next scenic spot, or daydreaming about my next travel escapade. Motorsport isn't just a hobby; it's a lifestyle that teaches me something new every day, whether it's about aerodynamics or life's twists and turns.
                    Looking for a teammate who's as comfortable in a pit stop as with a line of code? Drop me a line or ping me on LinkedIn. Let's see where we can go when we mix some fun with function!
                </p>
                <div className="header__cta">
                    <a href="#contact" className='btn primary'>Let's Talk</a>
                    <a href="#projects" className='btn light'>My Work</a>
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
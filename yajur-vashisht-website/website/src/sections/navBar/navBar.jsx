import Picture from '../../assets/header.png'
import data from './data'
import { IoIosColorPalette } from 'react-icons/io';
import './navBar.css'

const navBar = () => {
    return (
        <nav>
            <div className="container nav__container" >
                <a href="index.html" className='nav__logo'>
                    <img src={Picture} alt="Solo Picture" />
                </a>
                <ul className='nav__menu'>
                    {
                        data.map(item => <li key={item.id}> <a href={item.link}>{item.title}</a> </li>)
                    }
                </ul>
                <button id='theme__icon'><IoIosColorPalette /></button>
            </div>
        </nav>
    )
}

export default navBar
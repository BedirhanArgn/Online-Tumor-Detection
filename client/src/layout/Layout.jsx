import React, {useEffect} from 'react';
import classes from './layout.module.css';
import Navbar from "../components/Navbar/Navbar";
import NavbarItem from "../components/NavbarItem/NavbarItem";

const Layout = (props) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [localStorageData, setLocalStorageData] = React.useState('');

    useEffect(() => {
        setLocalStorageData(localStorage.getItem('authority'));
    }, []);

    const navbarData = [
        {name: 'Beyin Tümörü Nedir?', url: '/patient/braintumor'},
        {name: 'Beyin Tümörü Çeşitleri', url: '/patient/braintumor/varieties'},
        {name: 'Doktora Sor', url: '/patient/message'},
        {name: 'Hikaye Formu', url: '/patient/story'},
    ];

    const navbarDataDoctor = [
        {name: 'Tümör Tespiti', url: '/doctor/detect/tumor'},
        {name: 'Tümör Sınıflandırması', url: '/doctor/classify/tumor'},
        {name: 'Hastalar', url: '/doctor/patients'},
        {name: 'Mesajlar', url: '/doctor/messages'}
    ];

    if (localStorage.getItem('authority') === 'patient') {
        return (
            <>
                <div className="layout">
                    <Navbar color="#53AB8E" content={navbarData} setValue={setIsMenuOpen} value={isMenuOpen}/>
                    <div className={isMenuOpen === true ? classes.hamburgerMenu : classes.hamburgerMenuClose}>
                        {
                            navbarData.map((item) => {
                                return <NavbarItem key={item.name} name={item.name} url={item.url}/>
                            })
                        }
                    </div>
                </div>
                <div className={isMenuOpen === true ? classes.contentSlide : classes.content}>
                    {props.children}
                </div>
            </>
        );
    } else if (localStorage.getItem('authority') === 'doctor') {
        return (
            <>
                <div className="layout">
                    <Navbar color="#48AAC8" content={navbarData} setValue={setIsMenuOpen} value={isMenuOpen}/>
                    <div
                        className={isMenuOpen === true ? classes.hamburgerMenuDoctor : classes.hamburgerMenuCloseDoctor}>
                        {
                            navbarDataDoctor.map((item) => {
                                return <NavbarItem key={item.name} name={item.name} url={item.url}/>
                            })
                        }
                    </div>
                </div>
                <div className={isMenuOpen === true ? classes.contentSlide : classes.content}>
                    {props.children}
                </div>
            </>);
    } else {
        return (<div className={isMenuOpen === true ? classes.contentSlide : classes.content}>
                {props.children}
            </div>
        );
    }

}
export default Layout;

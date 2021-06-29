import React from 'react';
import classes from './Navbar.module.css';
import image from '../../images/hamburger.png'
import NavbarItem from "../NavbarItem/NavbarItem";
import logout from '../../images/logout.png';
import Auth from '../../authentication/Auth';
import {useHistory} from "react-router";
const Navbar = (props) => {

    const history = useHistory();

    return (
        <>
            <div className={classes.navbar} style={{backgroundColor: props.color}}>
                <img src={image} alt="hamburger-logo"
                     style={{width: "45px", height: "45px", cursor: "pointer", backgroundColor: "#FFFFF"}}
                     onClick={() => {
                         props.value === true ? props.setValue(false) : props.setValue(true);
                     }}/>
                <img src={logout} alt="logout"
                     style={{width: "35px", height: "40px", filter: 'invert(100%)', cursor: "pointer"}}
                    onClick={()=> {
                        let auth = new Auth();
                        auth.logout();
                        localStorage.clear();
                        history.push("/login");
                    }}
                />
            </div>
        </>
    );

}
export default Navbar;

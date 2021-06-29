import React from 'react';
import classes from './NavbarItem.module.css';
import {BrowserRouter, Link,NavLink, Redirect} from "react-router-dom";

const NavbarItem = (props) => {

    return (
        <div className={classes.navbarItem}>
                <Link to={props.url}>{props.name}</Link>
        </div>
    )
}
export default NavbarItem;

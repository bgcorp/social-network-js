import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.PNG'
//console.log(s); `${s.item} ${s.active}`

const Header = (props) => {
    return <header className={s.header}>
        <div>
            <img src={logo} alt='logo'/>
        </div>
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                : <NavLink to='/login'>Login</NavLink>}
        </div>
    </header>
}

export default Header;
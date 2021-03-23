import React, {Fragment} from 'react'
import '../style.css';
import { Link, withRouter } from 'react-router-dom';
import {  isAuth, logout } from '../Components/Helpers.js';
const Layout =({children,match, history})=> {
    const isActive = path => {
        if (match.path === path) {
            return { color: '#0afa2a' };
        } else {
            return { color: '#fff' };
        }
    };
    const nav = ()=>(
        
        <ul className="nav nav-tabs"  >
            <li className="nav-item">
                
            <Link to="/" className="nav-link" style={isActive('/')}>
                    Home
                </Link>
                
            </li>
            {!isAuth() &&(
                <Fragment>
                    <li className="nav-item">
                
                    <Link to="/signin" className="nav-link" style={isActive('/signin')}>
                    Signin
                </Link>
                
            </li>
            <li className="nav-item">
                
            <Link to="/signup" className="nav-link" style={isActive('/signup')}>
                    Signup
                </Link>
                
            </li>
                </Fragment>
            )}

            {isAuth() && (
                
                <li className="nav-item">
                    <span
                        className="text-light nav-link">
                        {isAuth().firstname}
                    </span>
                </li>
            )}

            {isAuth() && (
                <li className="nav-item">
                    <span
                        className=" nav-link"
                        style={{ cursor: 'pointer', color: '#fff' }}
                        onClick={() => {
                            logout(() => {
                                history.push('/signin');
                            });
                        }}
                    >
                        Logout
                    </span>
                </li>
            )}
        </ul>
        
    )
    return(
        <Fragment>
            {nav()}
            <div className = "container">
                {children}
            </div>
        </Fragment>
    )
}

export default withRouter (Layout);
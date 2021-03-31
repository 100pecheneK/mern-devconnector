import React from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {logout} from "../../actions/auth"
import PropTypes from 'prop-types'

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    Разработчкики
                </Link>
            </li>
            <li>
                <Link to="/posts">
                    Посты
                </Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"/>{' '}
                    <span className="hide-sm">Профиль</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className="fas fa-sign-out-alt"/>{' '}
                    <span className="hide-sm">Выйти</span>
                </a>
            </li>
        </ul>
    )
    const guestLinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    Разработчкики
                </Link>
            </li>
            <li><Link to="/register">Регистрация</Link></li>
            <li><Link to="/login">Вход</Link></li>
        </ul>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/" style={{textShadow: 'black 3px 3px 10px'}}> <i
                    className="fas fa-code"/> DevConnector </Link>
            </h1>
            {!loading && (<>{isAuthenticated ? authLinks : guestLinks}</>)}
        </nav>
    )
}

Navbar.protoTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    {logout}
)(Navbar)
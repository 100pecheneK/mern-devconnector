import React, {useState} from 'react'
import {Link, Redirect} from "react-router-dom"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {login} from "../../actions/auth"

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = async e => {
        e.preventDefault()
        login(email, password)
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }
    return (
        <>
            <h1 className="large text-primary">
                Вход
            </h1>
            <p className="lead"><i className="fas fa-user"/> Войдите в свой аккаунт</p>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <input
                        value={email}
                        name='email'
                        onChange={onChange}
                        type="email"
                        placeholder="Электронная почта"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        value={password}
                        name='password'
                        onChange={onChange}
                        type="password"
                        placeholder="Пароль"
                        minLength="6"
                        required
                    />
                </div>
                <input type="submit" value="Войти" className="btn btn-primary"/>
            </form>
            <p className="my-1">
                Ещё нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
            </p>
        </>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    {login}
)(Login)

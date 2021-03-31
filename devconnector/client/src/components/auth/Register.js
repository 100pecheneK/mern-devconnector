import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from "react-router-dom"
import {setAlert} from "../../actions/alert"
import {register} from "../../actions/auth"
import PropTypes from 'prop-types'

const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            setAlert('Пароли не совпадают', 'danger')
        } else {
            register({name, email, password})
        }
    }
    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }
    return (
        <>
            <h1 className="large text-primary">
                Регистрация
            </h1>
            <p className="lead"><i className="fas fa-user"/> Создайте свой аккаунт</p>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <input
                        value={name}
                        name='name'
                        onChange={onChange}
                        type="text"
                        placeholder="Имя"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        value={email}
                        name='email'
                        onChange={onChange}
                        type="email"
                        placeholder="Электронная почта"
                        required
                    />
                    <small className="form-text">
                        Этот сайт использует Gravatar, так что если вы хотите аватар в профиле,
                        используйте
                        Gravatar email
                    </small>
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
                <div className="form-group">
                    <input
                        value={password2}
                        name='password2'
                        onChange={onChange}
                        type="password"
                        placeholder="Подтвердите пароль"
                        minLength="6"
                        required
                    />
                </div>
                <input type="submit" value="Регистрация" className="btn btn-primary"/>
            </form>
            <p className="my-1">
                Уже есть аккаунт? <Link to="/login">Войдите</Link>
            </p>
        </>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(
    mapStateToProps,
    {setAlert, register}
)(Register)

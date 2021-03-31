import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {addExperience} from "../../actions/profile"
import {Link, withRouter} from "react-router-dom"

const AddExperience = ({addExperience, history}) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })
    const [toDateDisabled, toggleDateDisabled] = useState(false)
    const {company, title, location, from, to, current, description,} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        addExperience(formData, history)
    }
    return (
        <>
            <h1 className="large text-primary">
                Добавить профессиональный опыт
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"/> Добавьте ваш опыт, который вы имели когда-либо
            </p>
            <small>* обязательные поля</small>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <input type="text" placeholder="* Название работы" value={title} onChange={onChange}
                           name="title" required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Комания" value={company} onChange={onChange}
                           name="company" required/>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Место"
                        value={location}
                        onChange={onChange}
                        name="location"/>
                </div>

                <div className="form-group">
                    <h4>Дата начала</h4>
                    <input type="date"
                           value={from}
                           onChange={onChange}
                           name="from"/>
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            value={current}
                            checked={current}
                            onChange={e => {
                                setFormData({...formData, current: !current, to: ''})
                                toggleDateDisabled(!toDateDisabled)
                            }}
                            name="current"
                        />{' '}
                        Текущая работа
                    </p>
                </div>
                <div className="form-group">
                    <h4>Дата окончания</h4>
                    <input
                        type="date"
                        value={to}
                        onChange={onChange}
                        name="to"
                        disabled={toDateDisabled ? 'disabled' : ''}
                    />
                </div>

                <div className="form-group">
          <textarea
              name="description"
              value={description}
              onChange={onChange}
              cols="30"
              rows="5"
              placeholder="Описание работы"
          />
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn my-1" to="/dashboard">Назад</Link>
            </form>
        </>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(
    null,
    {addExperience}
)(withRouter(AddExperience))

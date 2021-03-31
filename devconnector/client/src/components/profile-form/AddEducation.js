import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {addEducation} from "../../actions/profile"
import {Link, withRouter} from "react-router-dom"

const AddEducation = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })
    const [toDateDisabled, toggleDateDisabled] = useState(false)
    const {school, degree, fieldofstudy, from, to, current, description,} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        addEducation(formData, history)
    }
    return (
        <>
            <h1 className="large text-primary">
                Добавьте ваше образование
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"/> Добавьте школу, институт, другое место, где вы обучались
            </p>
            <small>* обязательные поле</small>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Образовательное учреждение"
                        value={school} onChange={onChange} name="school"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Сертификат или степень"
                        value={degree} onChange={onChange} name="degree"
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Область знаний" value={fieldofstudy}
                           onChange={onChange} name="fieldofstudy"/>
                </div>

                <div className="form-group">
                    <h4>Начало обучения</h4>
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
                        Сейчас
                    </p>
                </div>
                <div className="form-group">
                    <h4>Конец обучения</h4>
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
              cols="30"
              value={description}
              onChange={onChange}
              rows="5"
              placeholder="Описание программы"
          />
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn my-1" to="/dashboard">Назад</Link>
            </form>
        </>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(
    null,
    {addEducation}
)(withRouter(AddEducation))

import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"
import Spinner from "../layout/Spinner"
import {
    FormGroupInput,
    FormGroupSelect,
    FormGroupSocialInput,
    FormGroupTextArea
} from "../fields/fields"

const ProfileForm = ({
                         onSubmit,
                         initialValues,
                         loading
                     }) => {
    const [displaySocialInputs, toggleSocialInputs] = useState(false)
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        bio: '',
        status: '',
        githubusername: '',
        skills: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
        vkontakte: '',
    })
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
        vkontakte,
    } = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    useEffect(() => {
        if (initialValues) {
            setFormData(prev => ({
                ...prev,
                company: !initialValues.company ? '' : initialValues.company,
                website: !initialValues.website ? '' : initialValues.website,
                location: !initialValues.location ? '' : initialValues.location,
                bio: !initialValues.bio ? '' : initialValues.bio,
                status: !initialValues.status ? '' : initialValues.status,
                githubusername: !initialValues.githubusername ? '' : initialValues.githubusername,
                skills: !initialValues.skills ? '' : initialValues.skills.join(', '),
            }))
            if (initialValues.social) {
                setFormData(prev => ({
                    ...prev,
                    youtube: !initialValues.social.youtube ? '' : initialValues.social.youtube,
                    twitter: !initialValues.social.twitter ? '' : initialValues.social.twitter,
                    facebook: !initialValues.social.facebook ? '' : initialValues.social.facebook,
                    linkedin: !initialValues.social.linkedin ? '' : initialValues.social.linkedin,
                    instagram: !initialValues.social.instagram ? '' : initialValues.social.instagram,
                    vkontakte: !initialValues.social.vkontakte ? '' : initialValues.social.vkontakte,
                }))
                toggleSocialInputs(true)
            }
        }
    }, [initialValues])
    const onFormSubmit = e => {
        e.preventDefault()
        onSubmit(formData)
    }
    if (loading) {
        return <Spinner/>
    }
    return (
        <>
            <h1 className="large text-primary">
                {initialValues ? 'Обновите свой профиль' : 'Создайте ваш профиль'}
            </h1>
            <p className="lead">
                <i className="fas fa-user"/>{' '}
                Поделитесь информацией о вас, чтобы сделать ваш профиль привлекательным
            </p>
            <small>* обязательные поля</small>
            <form onSubmit={onFormSubmit} className="form">
                <FormGroupSelect
                    options={[
                        {
                            text: '* Выберите профессиональный статус'
                        },
                        {
                            value: 'Разработчик'
                        },
                        {
                            value: 'Junior Разработчик'
                        },
                        {
                            value: 'Senior Разработчик'
                        },
                        {
                            value: 'Мэнеджер'
                        },
                        {
                            value: 'Студент или ученик'
                        },
                        {
                            value: 'Инструктор'
                        },
                        {
                            value: 'Интерн'
                        },
                        {
                            value: 'Другой'
                        },
                    ]}
                    name={'status'}
                    value={status}
                    onChange={onChange}
                />
                <FormGroupInput
                    name={'company'}
                    value={company}
                    placeholder={'Компания'}
                    onChange={onChange}
                    smallText={'Это может быть ваша собственная компания или компания, в которой вы работаете'}
                />
                <FormGroupInput
                    name={'website'}
                    value={website}
                    placeholder={'Сайт'}
                    onChange={onChange}
                    smallText={'Может быть ваш собственный или веб-сайт компании'}
                />
                <FormGroupInput
                    name={'location'}
                    value={location}
                    placeholder={'Местоположение'}
                    onChange={onChange}
                    smallText={'Рекомендуется город (например, Новоуральск, Екатеринбург)'}
                />
                <FormGroupInput
                    required={true}
                    name={'skills'}
                    value={skills}
                    placeholder={'* Навыки'}
                    onChange={onChange}
                    smallText={'Пожалуйста, впишите навыки через запятую (например, HTML, CSS, JavaScript, Python)'}
                />
                <FormGroupInput
                    name={'githubusername'}
                    value={githubusername}
                    placeholder={'Имя пользоватля Github'}
                    onChange={onChange}
                    smallText={'Если вам нужны ваши последние репозитории и ссылка на Github, укажите имя пользователя Github'}
                />
                <FormGroupTextArea
                    name={'bio'}
                    value={bio}
                    placeholder={'Краткая биография о себе'}
                    onChange={onChange}
                    smallText={'Расскажите нам немного о себе'}
                />
                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button"
                            className="btn btn-light">
                        Добавить ссылки на социальные сети
                    </button>
                    <span>Необязательно</span>
                </div>
                {displaySocialInputs &&
                <>
                    <FormGroupSocialInput
                        name={'facebook'}
                        value={facebook}
                        placeholder={'Facebook'}
                        onChange={onChange}
                        icon={'facebook'}
                    />
                    <FormGroupSocialInput
                        name={'twitter'}
                        value={twitter}
                        placeholder={'Twitter'}
                        onChange={onChange}
                        icon={'twitter'}
                    />
                    <FormGroupSocialInput
                        name={'youtube'}
                        value={youtube}
                        placeholder={'YouTube'}
                        onChange={onChange}
                        icon={'youtube'}
                    />
                    <FormGroupSocialInput
                        name={'linkedin'}
                        value={linkedin}
                        placeholder={'LinkedIn'}
                        onChange={onChange}
                        icon={'linkedin'}
                    />
                    <FormGroupSocialInput
                        name={'instagram'}
                        value={instagram}
                        placeholder={'Instagram'}
                        onChange={onChange}
                        icon={'instagram'}
                    />
                    <FormGroupSocialInput
                        name={'vkontakte'}
                        value={vkontakte}
                        placeholder={'VK'}
                        onChange={onChange}
                        icon={'vk'}
                    />
                </>
                }
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
            </form>
        </>
    )
}

ProfileForm.propTypes = {
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
}

export default ProfileForm

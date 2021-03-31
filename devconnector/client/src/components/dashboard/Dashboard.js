import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {deleteAccount, getCurrentProfile} from "../../actions/profile"
import Spinner from "../layout/Spinner"
import {Link} from "react-router-dom"
import DashboardActions from "./DashboardActions"
import Experience from "./Experience"
import Education from "./Education"

const Dashboard = ({getCurrentProfile, auth: {user}, profile: {profile, loading}, deleteAccount}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])
    return loading && profile === null ? <Spinner/> :
        <>
            <h1 className="large text-primary">Профиль</h1>
            <p className="lead">
                <i className="fas fa-user"/>{' '}
                Добро пожаловать, {user && user.name}
            </p>
            {
                profile !== null ?
                    <>
                        <DashboardActions/>
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}/>
                        <div className="my-2">
                            <button className="btn btn-danger" onClick={deleteAccount}>
                                <i className="fas fa-user-minus"/>{' '}
                                Удалить мой аккаунт
                            </button>
                        </div>
                    </>
                    :
                    <>
                        <p>Ваш профиль не заполнен, пожалуйста добавьте информацию о вас.</p>
                        <Link to='/create-profile' className="btn btn-primary my-1">
                            Создать профиль
                        </Link>
                    </>
            }
        </>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(
    mapStateToProps,
    {getCurrentProfile, deleteAccount}
)(Dashboard)

import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {getProfileById} from "../../actions/profile"
import Spinner from "../layout/Spinner"
import {Link} from "react-router-dom"
import ProfileTop from "./ProfileTop"
import ProfileAbout from "./ProfileAbout"
import ProfileExp from "./ProfileExp"
import ProfileEdu from "./ProfileEdu"
import ProfileGithub from "./ProfileGithub"

const Profile = ({getProfileById, profile: {profile, loading}, auth, match}) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])


    return (
        <>
            {profile === null || loading ? <Spinner/> :
                <>
                    <Link to='/profiles' className="btn btn-light">Назад к разработчикам</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                        <Link to='/edit-profile' className="btn btn-dark">Изменить профиль</Link>)}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Профессиональный опыт</h2>
                            {profile.experience.length > 0 ? (
                                <>
                                    {profile.experience.map(exp => (
                                        <ProfileExp key={exp._id} exp={exp}/>
                                    ))}
                                </>
                            ) : (
                                <h4>Нет профессионального опыта</h4>)}
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Образование</h2>
                            {profile.education.length > 0 ? (
                                <>
                                    {profile.education.map(edu => (
                                        <ProfileEdu key={edu._id} edu={edu}/>
                                    ))}
                                </>
                            ) : (
                                <h4>Нет образования</h4>)}
                        </div>
                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername}/>
                        )}
                    </div>


                </>
            }
        </>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(
    mapStateToProps,
    {getProfileById}
)(Profile)

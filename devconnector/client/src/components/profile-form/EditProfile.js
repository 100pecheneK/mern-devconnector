import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {withRouter} from 'react-router-dom'
import {createProfile, getCurrentProfile} from "../../actions/profile"
import ProfileForm from "./ProfileForm"


const EditProfile = ({
                         profile: {profile, loading},
                         createProfile,
                         history,
                         getCurrentProfile
                     }) => {

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])
    const onSubmit = formData => {
        createProfile(formData, history, true)
    }
    return (
        <ProfileForm
            initialValues={profile}
            onSubmit={onSubmit}
            loading={loading}
        />
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(
    mapStateToProps,
    {createProfile, getCurrentProfile}
)(withRouter(EditProfile))

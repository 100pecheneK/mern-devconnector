import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {withRouter} from 'react-router-dom'
import {createProfile} from "../../actions/profile"
import ProfileForm from "./ProfileForm"

const CreateProfile = ({createProfile, history}) => {

    const onSubmit = formData => {
        createProfile(formData, history)
    }
    return (
            <ProfileForm
                onSubmit={onSubmit}
            />
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

export default connect(
    null,
    {createProfile}
)(withRouter(CreateProfile))

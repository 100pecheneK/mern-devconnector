import React from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment"

const ProfileEdu = ({edu: {school, degree, fieldofstudy, current, to, from, description}}) => {
    return (
        <div>
            <h3>{school}</h3>
            <p><Moment format='DD/MM/YYYY'>{from}</Moment> - {!to ? 'Сейчас' :
                <Moment format='DD/MM/YYYY'>{to}</Moment>}</p>
            <p><strong>Степень: </strong> {degree}</p>
            <p><strong>Область: </strong> {fieldofstudy}</p>
            <p>
                <strong>Описание: </strong>{description}
            </p>
        </div>
    )
}

ProfileEdu.propTypes = {
    edu: PropTypes.object.isRequired,
}

export default ProfileEdu

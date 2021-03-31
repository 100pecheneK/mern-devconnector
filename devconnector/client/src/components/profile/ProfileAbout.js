import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({
                        profile: {
                            bio,
                            skills,
                            user: {name}
                        }
                    }) => (
    <div className="profile-about bg-light p-2">
        {bio && (
            <>
                <h2 className="text-primary">{name.trim().split(' ')[0]}</h2>
                <p>
                    {bio}
                </p>
                <div className="line"/>
            </>
        )}
        <h2 className="text-primary">Навыки</h2>
        <div className="skills">
            {skills.map((skill, i) => (
                <div className="p-1" key={i}><i className="fas fa-check"/> {skill}</div>
            ))}
        </div>
    </div>
)


ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop

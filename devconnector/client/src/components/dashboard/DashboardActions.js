import React from 'react'
import {Link} from "react-router-dom"

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to='/edit-profile' className="btn">
                <i className="fas fa-user-circle text-primary"/> Изменить профиль
            </Link>
            <Link to='/add-experience' className="btn">
                <i className="fab fa-black-tie text-primary"/> Добавить профессиональный опыт
            </Link>
            <Link to='/add-education' className="btn">
                <i className="fas fa-graduation-cap text-primary"/> Добавить образование
            </Link>
        </div>
    )
}

export default DashboardActions

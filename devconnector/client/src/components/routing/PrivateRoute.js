import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import Spinner from '../layout/Spinner'

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (loading) {
        return <Spinner />
      } else if (!isAuthenticated) {
        return <Redirect to='/login' />
      } else {
        return <Component {...props} />
      }
    }}
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
export default connect(mapStateToProps)(PrivateRoute)

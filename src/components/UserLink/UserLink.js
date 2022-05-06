import React, {forwardRef} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import PropTypes from 'prop-types'

export const UserLink = forwardRef(({ children, user, to = '/people/:id', ...rest }, ref) => {
  const props = { to: { pathname: to.replace(':id', encodeURIComponent(user.attuid) || user.id), state: user } }
  return (
    <RouterLink ref={ref} {...props} {...rest}>
      <div>{children || user.name}</div>
    </RouterLink>
  )
})

UserLink.propTypes = {
  /** Renders inside the link instead of user.name */
  children: PropTypes.elementType,
  /** User to link to their profile */
  user: PropTypes.shape({
    name: PropTypes.string,
    attuid: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  /** Where to link to if not using standard profile location */
  to: PropTypes.string,
}

UserLink.defaultProps = {
  to: '/people/:id',
}
export default UserLink

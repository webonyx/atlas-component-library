import React, { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'

export const UserLink = forwardRef(({ children, user, to = '/people/:id', ...rest }, ref) => {
  const props = { to: { pathname: to.replace(':id', encodeURIComponent(user.attuid) || user.id), state: user } }
  return (
    <RouterLink ref={ref} {...props} {...rest}>
      {children || user.name}
    </RouterLink>
  )
})

export default UserLink

/**
 * The user can view the hints stored in the database for the problem
 * (this is the one provided by the icpc team).
 *
 * It can also be a video link (also provided by the icpc team).
 */

import React from 'react'
import NavbarStack from './NavbarStack'

const HintByDatabaseTab = ({ problem }) => {
  return (
    <NavbarStack>
      <h3>Hint By Database</h3>
      <p>Hint by Database will be added soon</p>
    </NavbarStack>
  )
}

export default HintByDatabaseTab

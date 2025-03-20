import React from 'react'
import { useState } from 'react'


export const UserDataContext = React.createContext()

const UserContext = ({ children }) => {

  const [user, setuser] = useState({
    email: '',
    fullname:{
      firstname:'',
      lastname:''
    }
  })

  return (
    <div>
      <UserDataContext.Provider value={user}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext

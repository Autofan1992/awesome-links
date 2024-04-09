import { PropsWithChildren, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { DefaultContext } from '@apollo/client'

const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [context, setContext] = useState<DefaultContext | undefined>()

    return (
        <AuthContext.Provider
            value={{
                context,
                setContext
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

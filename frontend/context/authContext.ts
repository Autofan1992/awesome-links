import { DefaultContext } from '@apollo/client'
import { createContext, useContext } from 'react'

export const AuthContext = createContext<{
    context?: DefaultContext
    setContext: (context: DefaultContext) => void
} | null>(null)

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error(
            'useAuthContext must be used within an AuthContextProvider'
        )
    }
    return context
}

import { useAuthContext } from '../context/authContext'
import { useEffect } from 'react'
import { DefaultContext } from '@apollo/client'

export const useInitializeApolloContext = (context?: DefaultContext) => {
    const { setContext } = useAuthContext()

    useEffect(() => {
        context && setContext(context)
    }, [context])
}

export default useInitializeApolloContext

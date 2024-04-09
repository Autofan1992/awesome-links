import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import apolloClient from '../apollo/client'
import { ApolloProvider } from '@apollo/client'
import AuthContextProvider from '../components/AuthContextProvider'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <AuthContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthContextProvider>
        </ApolloProvider>
    )
}

export default MyApp

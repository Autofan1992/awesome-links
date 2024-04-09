import Head from 'next/head'
import { useLinksForHomeQuery } from '../graphql/queries/LinksForHome.generated'
import { DEFAULT_ITEMS_PER_REQUEST } from '../constants/pagination'
import { AwesomeLink } from '../components/AwesomeLink'
import { NextApiRequest, NextApiResponse } from 'next'
import { DefaultContext } from '@apollo/client'

import useInitializeApolloContext from '../hooks/useInitializeApolloContext'
import getApolloContext from '../utils/getApolloContext'

export interface IDefaultPageProps {
    context?: DefaultContext
}

export default function Home(props: IDefaultPageProps) {
    useInitializeApolloContext(props.context)

    const { data, loading, error, fetchMore } = useLinksForHomeQuery({
        variables: {
            input: {
                skip: 0,
                take: DEFAULT_ITEMS_PER_REQUEST
            }
        },
        context: props.context
    })
    if (loading) return <p>Loading...</p>
    if (error) return <p>Oooops, something went wrong {error.message}</p>

    const hasMore = Boolean(data?.linkConnection.hasMore)
    const links = data?.linkConnection.nodes ?? []

    return (
        <div>
            <Head>
                <title>Awesome Links</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container mx-auto max-w-5xl my-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {links.map((link) => (
                        <AwesomeLink key={link.id} {...link} />
                    ))}
                </div>
                {hasMore ? (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded my-10"
                        onClick={() => {
                            fetchMore({
                                variables: {
                                    input: {
                                        skip: links.length,
                                        take: 3
                                    }
                                },
                                updateQuery: (
                                    prevResult,
                                    { fetchMoreResult }
                                ) => {
                                    fetchMoreResult.linkConnection.nodes = [
                                        ...prevResult.linkConnection.nodes,
                                        ...fetchMoreResult.linkConnection.nodes
                                    ]
                                    return fetchMoreResult
                                }
                            })
                        }}
                    >
                        more
                    </button>
                ) : (
                    <p className="my-10 text-center font-medium">
                        You&apos;ve reached the end!{' '}
                    </p>
                )}
            </div>
        </div>
    )
}

export async function getServerSideProps({
    req,
    res
}: {
    req: NextApiRequest
    res: NextApiResponse
}) {
    const apolloContext = await getApolloContext({
        req,
        res
    })

    if (apolloContext) {
        return {
            props: {
                context: apolloContext
            }
        }
    }

    return {
        props: {}
    }
}

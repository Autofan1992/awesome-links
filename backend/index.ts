import { createYoga } from 'graphql-yoga'
import { schema } from './graphql/schema'
import { createContext } from './graphql/context'
import { createServer } from 'node:http'

const yoga = createYoga({
    schema: schema,
    context: createContext,
    graphqlEndpoint: '/api'
})

const server = createServer(yoga)

server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/api')
})

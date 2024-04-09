import builder from './builder'

// Queries
import './queries/Link.queries'
import './queries/Comment.queries'
import './queries/Me.queries'

// Mutations
import './mutations/Link.mutations'
import './mutations/Resource.mutations'

// Refs
import './refs/User.refs'
import './refs/Resource.refs'

export const schema = builder.toSchema()

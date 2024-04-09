import builder from '../builder'
import { ConnectionResponse } from '../types/response.types'
import { Comment } from '@prisma/client'

const CommentRef = builder.prismaObject('Comment', {
    fields: (t) => ({
        id: t.exposeID('id'),
        text: t.exposeString('text'),
        link: t.relation('link'),
        user: t.relation('user'),
    })
})

export const CommentInputRef = builder.inputType('CommentInput', {
    fields: (t) => ({
        id: t.string({ required: true }),
    }),
})

export const CommentConnectionResponseRef = builder.objectType(ConnectionResponse<Comment>, {
    name: 'CommentConnectionResponse',
    fields: (t) => ({
        nodes: t.expose('nodes', { type: [CommentRef] }),
        hasMore: t.exposeBoolean('hasMore'),
        totalCount: t.exposeInt('totalCount'),
    })
})
import builder from '../builder'
import { ConnectionResponse } from '../types/response.types'
import { Link } from '.prisma/client'

export const LinkRef = builder.prismaObject('Link', {
    fields: (t) => ({
        id: t.exposeID('id'),
        title: t.exposeString('title'),
        url: t.exposeString('url'),
        description: t.exposeString('description'),
        image: t.relation('image'),
        category: t.exposeString('category'),
        users: t.relation('users'),
        comments: t.relation('comments')
    })
})

export const CreateLinkInputRef = builder.inputType('CreateLinkInput', {
    fields: (t) => ({
        title: t.string({ required: true }),
        description: t.string({ required: true }),
        url: t.string({ required: true }),
        resourceId: t.string({ required: true }),
        category: t.string({ required: true })
    })
})

export const LinkInputRef = builder.inputType('LinkInput', {
    fields: (t) => ({
        id: t.string({ required: true })
    })
})

export const LinkConnectionResponseRef = builder.objectType(
    ConnectionResponse<Link>,
    {
        name: 'LinkConnectionResponse',
        fields: (t) => ({
            nodes: t.expose('nodes', { type: [LinkRef] }),
            hasMore: t.exposeBoolean('hasMore'),
            totalCount: t.exposeInt('totalCount')
        })
    }
)

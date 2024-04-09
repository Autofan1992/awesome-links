import builder from '../builder'
import { UserRole } from '@prisma/client'

builder.prismaObject('User', {
    fields: (t) => ({
        id: t.exposeID('id'),
        email: t.exposeString('email'),
        avatar: t.exposeString('avatar', { nullable: true }),
        role: t.expose('role', { type: UserRoleRef }),
        bookmarks: t.relation('bookmarks'),
        comments: t.relation('comments')
    })
})

const UserRoleRef = builder.enumType('UserRole', {
    values: Object.values(UserRole)
})

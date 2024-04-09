import builder from "../builder"
import prisma from "../../prisma/client"
import {
    CommentConnectionResponseRef,
    CommentInputRef,
} from "../refs/Comment.refs"
import { getConnectionInput } from "../../utils/connection.utils"
import ConnectionInputRef from "../refs/ConnectionInput.refs"

builder.queryField("commentConnection", t =>
    t.field({
        type: CommentConnectionResponseRef,
        args: {
            input: t.arg({ type: ConnectionInputRef }),
        },
        resolve: async (query, { input }) => {
            const { skip, take } = getConnectionInput(input || {})
            const totalCount = await prisma.comment.count()
            const nodes = await prisma.comment.findMany({
                ...query,
                skip,
                take,
            })
            const hasMore = totalCount > skip + take

            return {
                nodes,
                totalCount,
                hasMore,
            }
        },
    })
)

builder.queryField("comment", t =>
    t.prismaField({
        type: "Comment",
        nullable: true,
        args: {
            input: t.arg({ type: CommentInputRef, required: true }),
        },
        resolve: (query, __, args) => {
            return prisma.comment.findUnique({
                ...query,
                where: { id: args.input.id },
            })
        },
    })
)

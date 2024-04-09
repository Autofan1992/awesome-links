import builder from "../builder"
import { getConnectionInput } from "../../utils/connection.utils"
import ConnectionInputRef from "../refs/ConnectionInput.refs"
import { LinkConnectionResponseRef, LinkInputRef } from "../refs/Link.refs"
import prisma from "../../prisma/client"

builder.queryField("linkConnection", t =>
    t.field({
        type: LinkConnectionResponseRef,
        args: {
            input: t.arg({ type: ConnectionInputRef }),
        },
        resolve: async (query, { input }) => {
            const { skip, take } = getConnectionInput(input || {})
            const totalCount = await prisma.link.count()
            const nodes = await prisma.link.findMany({
                orderBy: {
                    createdAt: "desc",
                },
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

builder.queryField("link", t =>
    t.prismaField({
        type: "Link",
        nullable: true,
        args: {
            input: t.arg({ type: LinkInputRef, required: true }),
        },
        resolve: (query, __, args) => {
            return prisma.link.findUnique({
                ...query,
                where: { id: args.input.id },
            })
        },
    })
)

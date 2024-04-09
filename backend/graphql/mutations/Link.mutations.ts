import builder from "../builder"
import { CreateLinkInputRef } from "../refs/Link.refs"
import prisma from "../../prisma/client"
import { GraphQLError } from "graphql/error"

builder.mutationField("createLink", t =>
    t.prismaField({
        type: "Link",
        nullable: true,
        args: {
            input: t.arg({ type: CreateLinkInputRef, required: true }),
        },
        resolve: async (query, __, { input }, ctx) => {
            const { user: authUser } = await ctx

            if (!authUser) {
                throw new GraphQLError(
                    "You have to be logged in to perform this action",
                    {
                        extensions: {
                            response: {
                                status: 401,
                            },
                        },
                    }
                )
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: authUser.email,
                },
            })

            if (user?.role !== "ADMIN") {
                throw new GraphQLError(
                    "You don have permission ot perform this action",
                    {
                        extensions: {
                            response: {
                                status: 403,
                            },
                        },
                    }
                )
            }

            const { resourceId, ...rest } = input

            return prisma.link.create({
                ...query,
                data: {
                    ...rest,
                    image: {
                        connect: {
                            id: resourceId,
                        },
                    },
                },
            })
        },
    })
)

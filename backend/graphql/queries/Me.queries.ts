import builder from "../builder"
import prisma from "../../prisma/client"
import { GraphQLError } from "graphql/error"

builder.queryField("me", t =>
    t.prismaField({
        type: "User",
        nullable: true,
        resolve: async (query, __, ___, context) => {
            const { user: authUser } = await context

            if (!authUser) {
                throw new GraphQLError(
                    "You have to be logged in to get your profile",
                    {
                        extensions: {
                            response: {
                                status: 401,
                            },
                        },
                    }
                )
            }

            return prisma.user.findUnique({
                ...query,
                where: {
                    email: authUser.email,
                },
            })
        },
    })
)

import builder from "../builder"
import prisma from "../../prisma/client"
import { S3 } from "@aws-sdk/client-s3"
import { UploadResourceInputRef } from "../refs/Resource.refs"
import { GraphQLError } from "graphql/error"

const s3 = new S3({
    credentials: {
        accessKeyId: process.env.APP_AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.APP_AWS_SECRET_KEY || "",
    },
    region: process.env.APP_AWS_REGION,
})

builder.mutationField("uploadResource", t =>
    t.prismaField({
        type: "Resource",
        nullable: true,
        args: {
            input: t.arg({ type: UploadResourceInputRef, required: true }),
        },
        resolve: async (query, __, { input: { resource } }) => {
            try {
                await s3.putObject({
                    Body: Buffer.from(await resource.arrayBuffer()),
                    Bucket: process.env.AWS_S3_BUCKET_NAME || "",
                    Key: resource.name,
                })

                return prisma.resource.create({
                    ...query,
                    data: {
                        name: resource.name,
                        url: `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${resource.name}`,
                        mimeType: resource.type,
                    },
                })
            } catch (error: any) {
                throw new GraphQLError(error.message)
            }
        },
    })
)

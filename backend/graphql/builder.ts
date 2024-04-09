import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import { createContext } from './context'
import prisma from '../prisma/client'
import { File } from 'buffer'

const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes
    Context: ReturnType<typeof createContext>
    Scalars: {
        File: {
            Input: File
            Output: never
        }
    }
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma
    }
})

builder.queryType()
builder.mutationType()

builder.scalarType('File', {
    serialize: (value) => value
})
export default builder

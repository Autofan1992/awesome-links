import { ConnectionInput } from '../graphql/types/input.types'

const maxResultsPerRequest = 100

export const getConnectionInput = (input: ConnectionInput | undefined | null): { skip: number, take: number } => {
    return {
        skip: input?.skip ?? 0,
        take: input?.take ?? maxResultsPerRequest
    }
}


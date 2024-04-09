export class MutationResponse {
    code: number
    message: string

    constructor(code: number, message: string) {
        this.code = code
        this.message = message
    }
}

export class ConnectionResponse<T> {
    totalCount: number
    hasMore: boolean
    nodes: T[]

    constructor(totalCount: number, hasMore: boolean, nodes: T[]) {
        this.totalCount = totalCount
        this.hasMore = hasMore
        this.nodes = nodes
    }
}

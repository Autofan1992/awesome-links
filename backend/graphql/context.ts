import prisma from '../prisma/client'

export async function createContext({ request }: { request: Request }) {
    const authorization = request.headers.get('Authorization')
    const accessToken = authorization?.replace('Bearer ', '')

    // if the user is not logged in, return an empty object
    if (
        !accessToken ||
        accessToken === 'undefined' ||
        accessToken.length < 2 ||
        !authorization
    ) {
        return {}
    }

    const response = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`,
        {
            headers: {
                authorization
            }
        }
    )

    const { email } = await response.json()

    if (!email) {
        return {}
    }

    let user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        user = await prisma.user.create({
            data: {
                email
            }
        })
    }

    return {
        user,
        accessToken
    }
}

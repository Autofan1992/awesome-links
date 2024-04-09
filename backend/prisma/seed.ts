import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const linksToCreate = [
    {
        category: 'Open Source',
        description: 'Fullstack React framework 5',
        image: 'https://github.com/vercel.png',
        title: 'Next.js',
        url: 'https://nextjs.org'
    },
    {
        category: 'Open Source',
        description: 'Fullstack React framework 6',
        image: 'https://github.com/vercel.png',
        title: 'Next.js',
        url: 'https://nextjs.org'
    }
]

const resourcesToCreate = [
    {
        category: 'Open Source',
        description: 'Fullstack React framework 5',
        image: 'https://github.com/vercel.png',
        title: 'Next.js',
        url: 'https://nextjs.org'
    }
]

async function main() {
    const resources = await prisma.resource.createMany({
        data: resourcesToCreate,
    })

    prisma.$transaction(
        linksToCreate.map((link) => prisma.link.create({ data: link }))
    )
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

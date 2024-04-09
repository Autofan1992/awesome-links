import React, { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import type { GetServerSideProps } from 'next'
import { useCreateLinkMutation } from '../graphql/mutations/createLink.generated'
import { useUploadResourceMutation } from '../graphql/mutations/uploadResource.generated'
import { getSession } from '@auth0/nextjs-auth0'
import { IDefaultPageProps } from '.'
import useInitializeApolloContext from '../hooks/useInitializeApolloContext'

type FormValues = {
    title: string
    url: string
    category: string
    description: string
    image: FileList
}

const Admin = (props: IDefaultPageProps) => {
    useInitializeApolloContext(props.context)

    const { register, handleSubmit, reset, resetField, formState, watch } =
        useForm<FormValues>()
    const [createLink, { loading }] = useCreateLinkMutation()
    const [uploadResource, { error }] = useUploadResourceMutation()

    const file = watch('image')?.[0]
    const imageName = file?.name

    console.log(formState.errors)

    useEffect(() => {
        if (file && file.size > 1048576) {
            resetField('image')
            toast.error('File size should be less than 1MB')
        }
    }, [file, resetField])

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        console.log(values)
        const { title, url, category, description, image } = values
        const input = { title, url, category, description }

        const handleCreateLink = async () => {
            const { data } = await uploadResource({
                variables: { input: { resource: image[0] } }
            })

            if (!data?.uploadResource?.id) {
                return console.error('error', error?.message)
            }

            await createLink({
                variables: {
                    input: {
                        ...input,
                        resourceId: data.uploadResource.id
                    }
                },
                optimisticResponse: {
                    __typename: 'Mutation',
                    createLink: {
                        __typename: 'Link',
                        ...input,
                        image: {
                            __typename: 'Resource',
                            url: 'https://via.placeholder.com/300',
                            id: 'ID',
                            name: 'name'
                        },
                        id: 'ID'
                    }
                },
                update: (cache, result) => {
                    const createdLink = result.data?.createLink
                    if (createdLink) {
                        cache.modify({
                            fields: {
                                linkConnection(
                                    existingRefs = {},
                                    { toReference }
                                ) {
                                    const linkRef = toReference(createdLink)

                                    return {
                                        ...existingRefs,
                                        nodes: [linkRef, ...existingRefs.nodes]
                                    }
                                }
                            }
                        })
                    }
                }
            })
        }

        try {
            await toast.promise(handleCreateLink(), {
                loading: 'Creating new link..',
                success: 'Link successfully created!🎉',
                error: `Something went wrong 😥 Please try again -  ${error}`
            })
            reset()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container mx-auto max-w-md py-12">
            <Toaster />
            <h1 className="text-3xl font-medium my-5">Create a new link</h1>
            <form
                className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="block">
                    <span className="text-gray-700">Title</span>
                    <input
                        placeholder="Title"
                        {...register('title', { required: true })}
                        name="title"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Description</span>
                    <input
                        placeholder="Description"
                        {...register('description', { required: true })}
                        name="description"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Url</span>
                    <input
                        placeholder="https://example.com"
                        {...register('url', { required: true })}
                        name="url"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Category</span>
                    <input
                        placeholder="Name"
                        {...register('category', { required: true })}
                        name="category"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer">
                        Upload
                    </span>
                    <span
                        className={`ml-2 ${imageName ? 'text-blue-700' : ''}`}
                    >
                        {imageName || 'Upload a .png or .jpg image (max 1MB).'}
                    </span>
                    <input
                        {...register('image', { required: true })}
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg"
                        name="image"
                    />
                </label>

                <button
                    disabled={loading}
                    type="submit"
                    className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="w-6 h-6 animate-spin mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                            </svg>
                            Creating...
                        </span>
                    ) : (
                        <span>Create Link</span>
                    )}
                </button>
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession(req, res)

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/api/auth/login'
            },
            props: {}
        }
    }

    return {
        props: { accessToken: session.accessToken }
    }
}

export default Admin

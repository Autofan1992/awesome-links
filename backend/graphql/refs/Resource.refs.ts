import builder from '../builder'

export const UploadResourceInputRef = builder.inputType('UploadResourceInput', {
    fields: (t) => ({
        resource: t.field({ type: 'File', required: true })
    })
})

export const ResourceRef = builder.prismaObject('Resource', {
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        mimetype: t.exposeString('mimeType'),
        url: t.exposeString('url')
    })
})

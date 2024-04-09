import builder from '../builder'

const ConnectionInputRef = builder.inputType('ConnectionInput', {
    fields: (t) => ({
        skip: t.int(),
        take: t.int(),
    })
})

export default ConnectionInputRef
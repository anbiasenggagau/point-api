const mongoose = require('mongoose')

const Roles = mongoose.model('Roles', {
    name: { type: String, required: true },
    member: { type: Array, default: [] },
    authorization: [
        {
            group: { type: String, required: true },
            create: { type: Boolean, default: false },
            read: { type: Boolean, default: false },
            update: { type: Boolean, default: false },
            delete: { type: Boolean, default: false }
        }
    ]
})

module.exports = { Roles }
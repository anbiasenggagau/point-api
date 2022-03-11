const mongoose = require('mongoose')

const Branch = mongoose.model('Branch', {
    name: { type: String, required: true },
    member: { type: Array, default: [] }
})

module.exports = { Branch }
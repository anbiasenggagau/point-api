const mongoose = require('mongoose')

const Customers = mongoose.model('Customers', {
    code: { type: String, default: null },
    name: { type: String, required: true },
    type: { type: String, default: 'App\\Model\\Master\\Customer' },
    updated_at: { type: Date, default: new Date() },
    created_at: { type: Date, default: new Date() },
    updated_by: { type: String, required: true },
    created_by: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, default: null },
    credit_limit: { type: String, default: null },
    phone: { type: String, default: null },
    branch: { type: Array, default: [] },
    group: { type: Array, default: [] },
    pricing_group: { type: String, default: null }
})

module.exports = { Customers }
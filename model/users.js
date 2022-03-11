const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

let tokenID = uuidv4()

const Users = mongoose.model('Users', {
    name: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, default: null },
    phone: { type: Number, default: null },
    email: { type: String, required: true },
    phone_confirmation_code: { type: String, default: null },
    phone_confirmed: { type: Boolean, default: false },
    email_confirmation_code: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    token_id: { type: String, reuired: true }
})

const AuthUsers = mongoose.model('authUser', {
    username: { type: String, required: true },
    password: { type: String, required: true },
    token_id: { type: String, reuired: true }
})

module.exports = { Users, AuthUsers }
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { Users, AuthUsers } = require('./model/users')
const { Customers } = require('./model/groups')
const { Roles } = require('./model/roles')
const { Branch } = require('./model/branch')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

// Connect to Local MongoDBCompas
mongoose.connect('mongodb://localhost:27017/PointAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('Connected to Database')
})

// Initialize Dummy Datas For The Database
mongoose.connection.once('open', async () => {

    if (await Users.estimatedDocumentCount() == 2) {

        // Create New User
        let tokenID = uuidv4()

        let authUser = {
            username: 'senggagau',
            password: bcrypt.hashSync('asdasd', 10),
            token_id: tokenID
        }

        let user = {
            name: 'Anbia Senggagau',
            first_name: 'Anbia',
            last_name: 'Senggagau',
            email: 'muhammadesenggagau@gmail.com',
            email_confirmation_code: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            token_id: tokenID
        }

        let wait = await AuthUsers.insertMany(authUser)
        wait = await Users.insertMany(user)
        console.log('Added a user')
    }

    if (await Roles.estimatedDocumentCount() == 0) {

        let tokenID1 = await AuthUsers.findOne({ username: 'anbiasenggagau' })
        let tokenID2 = await AuthUsers.findOne({ username: 'senggagauanbia' })
        let tokenID3 = await AuthUsers.findOne({ username: 'senggagau' })

        tokenID1 = tokenID1.token_id
        tokenID2 = tokenID2.token_id
        tokenID3 = tokenID3.token_id


        const dummyData = [
            {
                name: 'Admin',
                member: [tokenID1],
                authorization: [
                    {
                        group: 'Customers',
                        create: false,
                        read: true,
                        update: false,
                        delete: false
                    },
                    {
                        group: 'Supliers',
                        create: false,
                        read: true,
                        update: false,
                        delete: false
                    }
                ]
            },
            {
                name: 'Super Admin',
                member: [tokenID2],
                authorization: [
                    {
                        group: 'Customers',
                        create: true,
                        read: true,
                        update: true,
                        delete: true
                    },
                    {
                        group: 'Supliers',
                        create: true,
                        read: true,
                        update: true,
                        delete: true
                    }
                ]
            },
            {
                name: 'Suplier Handler',
                member: [tokenID3],
                authorization: [
                    {
                        group: 'Supliers',
                        create: true,
                        read: true,
                        update: true,
                        delete: true
                    }
                ]
            }

        ]

        let wait = await Roles.insertMany(dummyData)
        console.log('Added Roles')
    }

    if (await Branch.estimatedDocumentCount() == 0) {
        let tokenID1 = await AuthUsers.findOne({ username: 'anbiasenggagau' })
        let tokenID2 = await AuthUsers.findOne({ username: 'senggagauanbia' })

        tokenID1 = tokenID1.token_id
        tokenID2 = tokenID2.token_id

        let dummyData = [
            {
                name: 'Jakarta',
                member: [tokenID1, tokenID2]
            },
            {
                name: 'Lampung',
                member: [tokenID1, tokenID2]
            },
            {
                name: 'Banten',
                member: [tokenID2]
            },
            {
                name: 'Jawa barat',
                member: [tokenID2]
            },
            {
                name: 'Jawa Timur',
                member: [tokenID2]
            }
        ]

        let wait = await Branch.insertMany(dummyData)
        console.log('Added Branch')
    }

    if (await Customers.estimatedDocumentCount() == 0) {
        // Create New Customers Data
        const data = require('./dummy data/customers')

        let wait = await Customers.insertMany(data)
        console.log('Added dummy datas')
    }

})

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Routing For Customers
app.use('/master', require('./routes/customers'))

// Authentication
app.post('/auth/login', async (req, res) => {

    let username = req.body.username
    let password = req.body.password

    let user = await AuthUsers.findOne({ username: username })

    if (user == null) return res.status(404).json({ error: { message: 'Cannot find the user' } })

    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({
        error: {
            message: 'Wrong password'
        }
    })

    let tokenID = user.token_id
    user = await Users.findOne({ token_id: tokenID })

    user = user.toObject()
    delete user.__v
    user.id = user._id
    delete user._id

    let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })

    user.access_token = accessToken
    user.token_type = 'Bearer'

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        user.token_expires_in = data.exp
    })

    res.status(200).json({ data: user })
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

module.exports = { app }
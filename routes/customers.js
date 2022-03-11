require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { Customers } = require('../model/groups')
const excel = require('exceljs')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())
router.use(cors())

const { authenticateToken } = require('../utils/tokenHandler')
const { downloadCustomersData } = require('../utils/customersExport')

// Download Customers Data as Excel File
router.get('/customers/download', async (req, res) => {

    // Check The Token
    authenticateToken(req, res)

    // Download Customers Data if Authenticate
    if (req.userData !== undefined) {
        try {
            downloadCustomersData(req, res)
        } catch (error) {
            res.sendStatus(500)
        }
    }

})

// Get Customers List
router.get('/customers', async (req, res) => {

    // Check The Token
    authenticateToken(req, res)

    if (req.userData !== undefined) {
        try {
            let data = await Customers.find()

            const temp = []
            data.forEach(element => {
                element = element.toObject()
                element.id = element._id
                delete element._id
                delete element.__v

                temp.push(element)
            })

            res.status(200).json({ data: temp })
        } catch (error) {
            res.sendStatus(500)
        }
    }
})

// Get a Specific Customer
router.get('/customers/:id', async (req, res) => {

    // Check The Token
    authenticateToken(req, res)

    if (req.userData !== undefined) {
        try {
            let id = req.params.id
            let customer = await Customers.findById(id)

            // Checking if a Customer Exist
            if (customer == null) return res.status(404).json({ message: "Cannot find the customer" })

            // Rename The Property
            customer = customer.toObject()
            customer.id = customer._id
            delete customer._id
            delete customer.__v

            res.status(200).json({ data: customer })

        } catch (error) {
            res.sendStatus(500)
        }
    }
})

// Create a Customer
router.post('/customers', async (req, res) => {

    // Check The Token
    authenticateToken(req, res)

    if (req.userData !== undefined) {
        try {
            // Collecting All Data From the body
            // If it's not defined, then it will be null valued
            let name = req.body.name
            let code = req.body.code || null
            let email = req.body.email || null
            let phone = req.body.phone || null
            let address = req.body.address || null
            let branch = req.body.branch && req.body.branch.split(', ') || []
            let group = req.body.group && req.body.group.split(', ') || []
            let pricing_group = req.body.pricing_group || null

            const customer = {
                code: code,
                name: name,
                updated_by: req.userData.id,
                created_by: req.userData.id,
                email: email,
                phone: phone,
                address: address,
                branch: branch,
                group: group,
                pricing_group: pricing_group
            }

            // Insert new Customer to Database
            let wait = await Customers.insertMany(customer)
            wait = wait[0]

            res.status(201).json({
                data: {
                    id: wait._id,
                    name: name,
                    updated_at: wait.updated_at,
                    created_at: wait.created_at,
                    updated_by: wait.updated_by,
                    created_by: wait.created_by,
                }
            })
        } catch (error) {
            res.sendStatus(500)
        }
    }
})

// Update a Customer
router.patch('/customers/:id', async (req, res) => {

    // Check The Token
    authenticateToken(req, res)
    if (req.userData !== undefined) {
        try {
            let id = req.params.id

            let updatedUser = {}

            // Collecting All Data From the body
            // If it's not defined, then it will be null valued
            updatedUser.name = req.body.name
            updatedUser.code = req.body.code || null
            updatedUser.email = req.body.email || null
            updatedUser.phone = req.body.phone || null
            updatedUser.address = req.body.address || null
            updatedUser.branch = req.body.branch && req.body.branch.split(', ') || null
            updatedUser.group = req.body.group && req.body.group.split(', ') || null
            updatedUser.pricing_group = req.body.pricing_group || null

            // All property null valued will be deleted
            for (const key in updatedUser) {
                console.log(typeof updatedUser[key])
                if (updatedUser[key] == null) delete updatedUser[key]
            }

            // Get Current Time
            updatedUser.updated_at = new Date()
            updatedUser.updated_by = req.userData.id

            console.log(updatedUser)

            // Find The Customer and Update Its Data
            let wait = await Customers.findByIdAndUpdate(id, updatedUser)

            // Checking if a Customer Exist
            if (wait == null) return res.status(404).json({ message: "Cannot find the customer" })

            // Get The Updated Customer
            wait = await Customers.findById(wait._id)

            res.status(200).json({
                data: {
                    id: wait._id,
                    name: wait.name,
                    updated_at: wait.updated_at,
                    created_at: wait.created_at,
                    updated_by: wait.updated_by,
                    created_by: wait.created_by,
                }
            })
        } catch (error) {
            res.sendStatus(500)
        }

    }
})

// Delete a Customer
router.delete("/customers/:id", async (req, res) => {

    // Check The Token
    authenticateToken(req, res)
    if (req.userData !== undefined) {
        try {
            let id = req.params.id

            // Find the Customer and Remove
            let wait = await Customers.findByIdAndRemove(id)

            // Checking if a Customer Exist
            if (wait == null) return res.status(404).json({ message: "Cannot find the customer" })

            res.sendStatus(204)
        } catch (error) {
            res.sendStatus(500)
        }
    }

})

module.exports = router
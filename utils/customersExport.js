const { Customers } = require('../model/groups')
const { Roles } = require('../model/roles')
const { Branch } = require('../model/branch')
const excel = require('exceljs')

async function downloadCustomersData(req, res) {

    // Checking the roles of the user, if they're permitted to read or not
    let roles = await Roles.find({ member: req.userData.token_id })
    let permitted

    for (let i = 0; i < roles.length; i++) {

        roles[i].authorization.forEach(element => {
            if (element.group == 'Customers' && element.read === true) {
                permitted = true
            }
        })
    }

    // If not permitted, will send HTTP Code Forbidden
    if (permitted == undefined) return res.sendStatus(403)

    // Get Branch List of User assigned to
    let branchs = await Branch.find({ member: req.userData.token_id })

    let userBranch = []

    branchs.forEach(element => {
        userBranch.push(element.name)
    })

    // Get all Customers Data
    let temp = []
    let customers = await Customers.find()

    // Filtering the Customers by branch
    let j = 1;
    customers.forEach((element, index) => {

        element = element.toObject()

        for (let i = 0; i < userBranch.length; i++) {
            if (element.branch.includes(userBranch[i]) || element.branch.length == 0) {

                delete element._id
                delete element.__v
                delete element.type
                delete element.updated_at
                delete element.updated_by
                delete element.created_by
                delete element.created_at

                element.no = j
                element.branch = element.branch.join(", ")
                element.group = element.group.join(", ")

                temp.push(element)

                j++
                break
            }
        }

    })

    // Arrange a workbook of excel
    let excelFile = new excel.Workbook();
    let customersSheet = excelFile.addWorksheet("Customers");
    customersSheet.columns = [
        { header: "Date Export", key: "Date Export", width: 30 },
        { header: new Date().toDateString(), key: "Date", width: 30 },
        { header: "", key: "no", width: 5 },
        { header: "", key: "code", width: 30 },
        { header: "", key: "name", width: 30 },
        { header: "", key: "email", width: 30 },
        { header: "", key: "address", width: 30 },
        { header: "", key: "credit_limit", width: 30 },
        { header: "", key: "phone", width: 30 },
        { header: "", key: "branch", width: 30 },
        { header: "", key: "group", width: 30 },
        { header: "", key: "pricing_group", width: 30 }
    ];

    customersSheet.addRows([
        {},
        {},
        {
            no: 'No',
            code: 'Code',
            name: 'Name',
            email: 'Email',
            address: 'Address',
            credit_limit: 'Credit Limit',
            phone: 'Phone',
            branch: 'Branch',
            group: 'Group',
            pricing_group: 'Pricing Group'
        }
    ])

    customersSheet.addRows(temp)

    // Merge and Center the Header
    customersSheet.mergeCells('C3:L3')
    customersSheet.getCell('C3').value = 'Nama Tenant'
    customersSheet.getCell('C3').alignment = { vertical: 'middle', horizontal: 'center' };

    // Assign Border Through The Data
    let rows = temp.length + 1
    let columns = 10

    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= columns; j++) {
            customersSheet.getCell(i + 3, j + 2).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        }
    }

    // Set The Header to Download
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Customers.xlsx"
    );

    // Download Data
    return excelFile.xlsx.write(res).then(function () {
        res.status(200).end();
    })
}

module.exports = { downloadCustomersData }
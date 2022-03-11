const pricing_group = ['RESELLER', null]
const branch = [['Lampung', 'Banten', 'Jakarta'], ['Jakarta'], ['Jawa Barat', 'Jawa Timur'], ['Lampung', 'Jakarta'], []]
const group = [['Hotel', 'Restaurant'], []]

const data = [
    { "code": "68180-877", "name": "Peter Toxell", "email": "ptoxell0@ucla.edu", "phone": "2857057391" },
    { "code": null, "name": "Henri Euels", "email": null, "phone": null },
    { "code": "0268-1412", "name": "Ddene Borsi", "email": "dborsi2@adobe.com", "phone": "4606836280" },
    { "code": null, "name": "Vinnie Hallor", "email": null, "phone": null },
    { "code": "43857-0194", "name": "Andy Flagg", "email": "aflagg4@chicagotribune.com", "phone": "7686410471" },
    { "code": "0378-4884", "name": "Felita Elstob", "email": "felstob5@google.co.jp", "phone": "9602288169" },
    { "code": null, "name": "Jae Wones", "email": null, "phone": null },
    { "code": null, "name": "Jocelin Doidge", "email": null, "phone": null },
    { "code": "0904-6266", "name": "Odey Hambling", "email": "ohambling8@twitpic.com", "phone": "9916872863" },
    { "code": null, "name": "Louis Beadnall", "email": null, "phone": null },
    { "code": "49999-711", "name": "Tatum Matej", "email": "tmateja@yolasite.com", "phone": "3825433220" },
    { "code": "49993-860", "name": "Leila Sifleet", "email": "lsifleetb@oaic.gov.au", "phone": "2832363005" },
    { "code": "10893-892", "name": "Norrie Reedyhough", "email": "nreedyhoughc@is.gd", "phone": "8616300572" },
    { "code": "58232-0653", "name": "Aila Dongles", "email": "adonglesd@google.nl", "phone": "1356995323" },
    { "code": "64117-110", "name": "Kristos Scandroot", "email": "kscandroote@cbc.ca", "phone": "8806532628" },
    { "code": "55289-403", "name": "Netta Keatley", "email": "nkeatleyf@shutterfly.com", "phone": "3977011430" },
    { "code": "52533-124", "name": "Jillane Swaden", "email": "jswadeng@ocn.ne.jp", "phone": "4519135680" },
    { "code": null, "name": "Ryley Sabie", "email": null, "phone": null },
    { "code": null, "name": "Robby Takle", "email": null, "phone": null },
    { "code": null, "name": "Haleigh Shovelin", "email": null, "phone": null },
    { "code": null, "name": "Caldwell Feldharker", "email": null, "phone": null },
    { "code": "49288-0724", "name": "Thorndike Dowry", "email": "tdowryl@ebay.co.uk", "phone": "9228989820" },
    { "code": null, "name": "Timothee Parmer", "email": null, "phone": null },
    { "code": "42808-410", "name": "Neale Crambie", "email": "ncrambien@admin.ch", "phone": "7386476413" },
    { "code": "10191-1829", "name": "Ranique Lansdown", "email": "rlansdowno@yale.edu", "phone": "5192575152" },
    { "code": null, "name": "Jo ann Crampin", "email": null, "phone": null },
    { "code": null, "name": "Dionis Pittoli", "email": null, "phone": null },
    { "code": "64942-1225", "name": "Horten Grigorian", "email": "hgrigorianr@php.net", "phone": "7739193184" },
    { "code": null, "name": "Dede Bickerstaffe", "email": null, "phone": null },
    { "code": "37000-392", "name": "Hali Elland", "email": "hellandt@ask.com", "phone": "7361288824" },
    { "code": "0378-6805", "name": "Anica Rosenfield", "email": "arosenfieldu@webnode.com", "phone": "7411601519" },
    { "code": "69238-1252", "name": "Sarita Tilly", "email": "stillyv@bloomberg.com", "phone": "9379073755" },
    { "code": null, "name": "Mandy Leggen", "email": null, "phone": null },
    { "code": null, "name": "Lucretia Santore", "email": null, "phone": null },
    { "code": null, "name": "Eveline Odam", "email": null, "phone": null },
    { "code": null, "name": "Thurstan Steen", "email": null, "phone": null },
    { "code": "49893-500", "name": "Godard Giraudel", "email": "ggiraudel10@plala.or.jp", "phone": "6115234046" },
    { "code": "0615-3562", "name": "Rutledge Biggin", "email": "rbiggin11@google.de", "phone": "9434065495" },
    { "code": "42291-600", "name": "Scot Guymer", "email": "sguymer12@vistaprint.com", "phone": "8651760654" },
    { "code": null, "name": "Andriette Minster", "email": null, "phone": null },
    { "code": null, "name": "Arabela Jenney", "email": null, "phone": null },
    { "code": null, "name": "Bayard Chazerand", "email": null, "phone": null },
    { "code": null, "name": "Hanson Sorby", "email": null, "phone": null },
    { "code": null, "name": "Aura Trainor", "email": null, "phone": null },
    { "code": null, "name": "Lorri Gerran", "email": null, "phone": null },
    { "code": "61786-032", "name": "Tansy Dinnington", "email": "tdinnington19@barnesandnoble.com", "phone": "8387563561" },
    { "code": "57896-794", "name": "Georgie Summerill", "email": "gsummerill1a@foxnews.com", "phone": "7902657415" },
    { "code": null, "name": "Daile Deegin", "email": null, "phone": null },
    { "code": "47335-903", "name": "Dona Doerren", "email": "ddoerren1c@nba.com", "phone": "6715992673" },
    { "code": "54868-4482", "name": "Lyndsey Moorcraft", "email": "lmoorcraft1d@jugem.jp", "phone": "3349179999" }
]

data.forEach(element => {
    element.pricing_group = pricing_group[Math.floor(Math.random() * 2)]
    element.group = group[Math.floor(Math.random() * 2)]
    element.branch = branch[Math.floor(Math.random() * 5)]
    element.created_by = '62285bb4209dc0910932a03d'
    element.updated_by = '62285bb4209dc0910932a03d'
    element.address = 'Jl. Musi No. 21, Surabaya'
    element.credit_limit = Math.floor(Math.random() * 10000)
})

module.exports = data
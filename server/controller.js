const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    addExpense: (req, res) => {
        const {expense, person, cost} = req.body
        sequelize.query(`INSERT INTO expenses (expense, person, cost)
        VALUES ('${expense}','${person}',${cost});
    `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    getTotalExpenses: (req, res) => {
        sequelize.query('SELECT SUM(cost) FROM expenses')
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    getSplitExpenses: (req, res) => {
        const {yourName, friendsName} = req.body
        sequelize.query(`SELECT SUM (cost) FROM expenses WHERE person='${yourName}'`)
            .then(dbResOne => {
                sequelize.query(`SELECT SUM (cost) FROM expenses WHERE person='${friendsName}'`).then(dbResTwo =>{
                    res.status(200).send({totalOne:dbResOne[0], totalTwo:dbResTwo[0]})
                })
            })
        
    },
    deleteExpense: (req, res) => {
        const {id} = req.params
        sequelize.query(`
        DELETE
        FROM expenses
        WHERE expense_id = ${id};
        `)
            .then(dbRes => res.status(200).send(dbRes[0]))
    }
}
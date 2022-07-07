require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {addExpense, getTotalExpenses, deleteExpense, getSplitExpenses} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/addExpense', addExpense)
app.post('/getSplitExpenses', getSplitExpenses)
app.get('/getTotalExpenses', getTotalExpenses)
app.delete('/deleteExpense', deleteExpense)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))

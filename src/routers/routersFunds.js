const express = require('express')
const router = express.Router()

const Controllers = require('../controllers/controllersFunds')

//http://localhost:3000/funds/listAll
router.get('/listAll' , Controllers.GetListAll)
//http://localhost:3000/funds/search
router.get('/search/:name' , Controllers.Search)
//http://localhost:3000/funds/payments/:id
router.get('/payments/:name/:page' , Controllers.PagePayments)

module.exports = app => app.use('/funds', router)
const express = require('express')
const router = express.Router()

const Controllers = require('../controllers/controllersActions')

//http://localhost:3000/actions/listAll
router.get('/listAll' , Controllers.GetListAll)

//http://localhost:3000/actions/search
router.get('/search/:name' , Controllers.Search)

//http://localhost:3000/actions/payments/:id
router.get('/payments/:name/:page' , Controllers.PagePayments)

module.exports = app => app.use('/actions', router)
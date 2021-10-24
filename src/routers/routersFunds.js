const express = require('express')
const router = express.Router()

const Controllers = require('../controllers/controllersFunds')

//http://localhost:3000/funds/listAll
router.get('/listAll' , Controllers.GetListAll)

module.exports = app => app.use('/funds', router)
const express = require('express')
const router = express.Router()

const Controllers = require('../controllers/controllersActions')

//http://localhost:3000/actions/listAll
router.get('/listAll' , Controllers.GetListAll)


module.exports = app => app.use('/actions', router)
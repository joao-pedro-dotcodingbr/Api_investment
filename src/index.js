const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

require('./routers/index')(app)

app.listen(PORT ,() =>{
    console.log('port conected')
})
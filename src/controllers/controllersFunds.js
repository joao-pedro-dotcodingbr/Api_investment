const Api = require('../services/requestionsFunds')
const Url = process.env.Url || 'http://localhost:3000'

exports.GetListAll = async (req, res) =>{

    try {

        const result = await Api.GetAllList()
   
        res.send(result)
        
        
    } catch (error) {

        console.log(error)
        
    }

}

exports.Search = async (req, res) =>{

    const name = req.params.name;

    try {

        const result = await Api.Search(name)

        res.send(result)

        
    } catch (error) {
        console.log(error)
    }

}

exports.PagePayments = async (req, res) =>{

    const name = req.params.name
    const numeric = req.params.page

    try {       

        if(isNaN(parseInt(numeric))){

            res.status(400).send({error:'add numeric page'})

        }else{
            
            const intNumber = parseInt(numeric)

            const result = await Api.ShowPagePayments(name, intNumber)

            res.send(result)
        }
        
        
    } catch (error) {

        console.log(error)
        
    }

}

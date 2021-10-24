const Api = require('../services/requestionsFunds')

exports.GetListAll = async (req, res) =>{

    try {

        const result = await Api.GetAllList()
   
        res.send(result)
        
        
    } catch (error) {

        console.log(error)
        
    }

}

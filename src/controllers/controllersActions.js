const Api = require('../services/requestionsActions')

exports.GetListAll = async (req, res) =>{

    try {

        const result = await Api.GetAllList()
   
        res.send(result)
        
        
    } catch (error) {

        console.log(error)
        
    }

}

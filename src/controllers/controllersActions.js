const Api = require('../services/requestionsActions')

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
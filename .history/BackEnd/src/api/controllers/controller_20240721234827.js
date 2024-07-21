const xlsx = require( 'xlsx' )


const controller1 = ( req, res ) =>
{
    res.send("Hello kien")
}

const controller2 = (req,res)=>{
    res.send("controller 2")
}

const addData = (req,res)=>{
    // const filePath = path.join(__dirname, "data.xlsx")
    res.send("add data")
    console.log(__dirname,'../Da')
}
module.exports = {controller1,controller2,addData}
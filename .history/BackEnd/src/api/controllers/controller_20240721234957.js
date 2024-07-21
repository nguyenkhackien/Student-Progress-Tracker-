const xlsx = require( 'xlsx' )


const controller1 = ( req, res ) =>
{
    res.send("Hello kien")
}

const controller2 = (req,res)=>{
    res.send("controller 2")
}

const addData = (req,res)=>{
    const filePath = path.join(__dirname, '../Data.'
    res.send("add data")
    console.log(filePath)
}
module.exports = {controller1,controller2,addData}
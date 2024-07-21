const controller1 = (req,res)=>{
    res.send("Hello kien")
}

const controller2 = (req,res)=>{
    res.send("controller 2")
}

const addData = (req,res)=>{
    const workBook = xlsx.read
}
module.exports = {controller1,controller2,addData}
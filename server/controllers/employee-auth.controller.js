const empRegister = async(req,res)=>{
try {
  
} catch (err) {
  res.status(500).json({message: err.message})
}
}


module.exports = {empRegister}
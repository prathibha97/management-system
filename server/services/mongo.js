const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URI)
    console.log('connected to MongoDb')
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = connectDb
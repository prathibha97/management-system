require('dotenv').config()
const http = require('http')
const app = require('./app')
const connectDb = require('./services/mongo')


const port = process.env.PORT || 5001
const server = http.createServer(app)

const startServer = () => {
  server.listen(port, async () => {
    console.log(`server is running on port ${port}`)
    await connectDb()
  }
  )
}

startServer()

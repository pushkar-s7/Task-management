const express = require("express")
const app = express()
require("./dataBase/config")
const routes = require("./Routes/route")
const cors = require("cors")
app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(5000, () => {
  console.log("server is running on port 5000")
})

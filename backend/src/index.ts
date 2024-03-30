const express = require('express')
const app = express();
require('./dataBase/config')
const authrouter = require('./Routes/authroutes')
const cors = require('cors')
app.use(cors());
app.use(express.json());

app.use(authrouter);

app.listen(5000, () => {
    console.log("server is running on port 5000");
});
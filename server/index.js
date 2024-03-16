const express = require("express");
const app = express();
const cors = require("cors");
PORT = 5000;
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
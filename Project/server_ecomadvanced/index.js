const express = require('express');
const app = express();
app.use(express.static('uploads'))
const multer = require('multer');
const dotenv = require('dotenv').config();
const port=process.env.PORT;
const routes = require('./routes/router')
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.use(routes)
app.listen(port,(err)=>{
    if(err)console.log(err.message);
    console.log(`connected to port no : ${port} successfully`);
})
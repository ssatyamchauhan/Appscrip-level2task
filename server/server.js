const express = require("express");
const bodyParser = require('body-parser');
// const db = require('./database')();
const app = express();
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({limit: '100mb'}));
// app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(express.json())


// routes are goes here
app.use(require('./lib/routes/data'))



app.listen(2000, () => {
    console.log(`listening port ${2000}`)
})
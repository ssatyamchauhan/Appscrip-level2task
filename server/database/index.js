const mongoose = require('mongoose');
require('dotenv').config({ path: '/home/react/Appscript/server/.env' })
module.exports = () => {

    // Build the connection String and create the database connection
    mongoose.connect(
        `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    )

    // When successfully connected
    mongoose.connection.on('connected', () => {
        console.log(`Mongoose  default connection open to => mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
    })

    // if  connection throws an error
    mongoose.connection.on('error', (err) => {
        console.log(`Mongoose default connection error ${err}`)
    })

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
        console.log(`Mongoose default connection is disconnected`)
    })

    // Requiring schemas from the root database/models folder
    
    const dataSchema = require('./models/data')(mongoose);

    // So far so good. We've got a schema and next step is compiling our schema into a Model

    if (!mongoose.models.data) {
        //
        console.log('table is made ')
        mongoose.model('data', dataSchema);
    }
    

    // If the node process ends, close the mongoose connection 
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        })
    })

    return mongoose.models;

}
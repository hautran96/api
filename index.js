const express = require('express')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000

const app = express();
const mongoPath = "mongodb+srv://cinema:cinema123@db-cinema.briip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoPath, {
    connectTimeoutMS: 172800000,
    socketTimeoutMS: 172800000,
    keepAlive: true
})

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoPath}`);
})

mongoose.connection.on("open", () => {
    console.log('Connected to mongodb database');
})

mongoose.connection.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});

mongoose.connection.on('disconnected', function () {
    throw new Error(`MongoDB disconnected!: ${config.db}`);
});

if (!module.parent) {
    // listen on port config.port
    app.listen(port, "0.0.0.0", () => {
        console.log(`server started on port ${port} `);
    });
}

module.exports = app
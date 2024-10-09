const express = require ('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'BoardGames'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.deb(dbName)
    })
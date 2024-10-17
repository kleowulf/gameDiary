const express = require ('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'BoardGames'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (request, response)=>{
    const gameList = await db.collection('GameInfo').find().toArray()
    response.render('index.ejs', {items: gameList})
    console.log(gameList)
})

app.post('/addAGame', (request, response) => {
    db.collection('GameInfo').insertOne({Name: request.body.gameName, Rating: request.body.gameRating, Notes: request.body.gameNotes, Plays: request.body.gamePlays})
    .then(result => {
        console.log('game added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteGame', (request, response)=>{
    db.collection('GameInfo').deleteOne({Name: request.body.itemsFromJS})
    .then(result => {
        console.log('Game deleted')
        response.json('Game Deleted')
    })
    .catch(error => console.error(error))
})

app.put('/increasePlays', (request, response)=>{
    db.collection('GameInfo').updateOne({Name: request.body.itemFromJS}, {
        $set: {
            Plays: request.body.playsFromJS + 1
          }
    })
    .then(result => {
        console.log('Play Increase')
        response.json('Play increase')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
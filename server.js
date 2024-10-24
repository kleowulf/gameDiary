const express = require ('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
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
    const gameList = await db.collection('GameInfo').find().sort({Plays: -1}).toArray()
    const gameCount = await db.collection('GameInfo').countDocuments()
   

    response.render('index.ejs', {items: gameList, count: gameCount})

})

app.get('/searchAGame', async (request, response)=>{
    const gameName = request.query.searchGame;
    console.log(gameName)
    const game =  await db.collection('GameInfo').find({ Name: gameName}).toArray()
    const gameCount = await db.collection('GameInfo').countDocuments()
    response.render('index.ejs', {items: game, count:gameCount})
    console.log(game)
})

app.post('/addAGame', (request, response) => {
    db.collection('GameInfo').insertOne({Name: request.body.gameName, Rating: request.body.gameRating, Notes: request.body.gameNotes, Plays: Number(request.body.gamePlays)})
    .then(result => {
        console.log('game added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteGame', (request, response)=>{
    db.collection('GameInfo').deleteOne({_id: new ObjectId(request.body.itemId)})
    .then(result => {
        console.log('Game deleted')
        response.json('Game Deleted')
    })
    .catch(error => console.error(error))
})

app.put('/increasePlays', (request, response) => {
   console.log(request.body.itemId)
    db.collection('GameInfo').updateOne(
        { _id: new ObjectId(request.body.itemId) }, // Only match the document by Name
        { 
            $inc: { Plays: 1 } // Increment Plays by 1
        }

       
    )
    .then(result => {
        console.log('Play Increase')
        response.json('Play increase')
        console.log(result)
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})